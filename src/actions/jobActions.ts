"use server";

import dbConnect from "@/utils/dbConnect";
import JobModel, { JobDocument } from "@/model/Job.model";
import { createJobSchema } from "@/validation/job.validation";
import { z } from "zod";
import { gzip, gunzip } from "zlib";
import { promisify } from "util";
import { LocationType } from "@/lib/enums";
import { ApiResponse } from "@/lib/types";
import { DBConnectionError, DBConnectionErrorRedirectPath } from "@/lib/errors";
import { redirect } from "next/navigation";

const compress = promisify(gzip);

export async function createJob(
    data: z.infer<typeof createJobSchema>
): Promise<ApiResponse<null>> {
    try {
        await dbConnect();

        const validation = createJobSchema.safeParse(data);

        if (!validation.success) {
            return {
                success: false,
                message: validation.error.errors
                    .map((err) => err.message)
                    .join(", "),
            };
        }

        const parsedData = validation.data;

        if (parsedData.locationType === LocationType.Remote) {
            delete parsedData.city;
            delete parsedData.state;
        }

        const { jobDescription, ...restData } = parsedData;

        let base64String = null;

        if (jobDescription) {
            // compress job description
            const compressedBuffer = await compress(jobDescription);
            base64String = compressedBuffer.toString("base64");
        }

        console.log(restData);

        await JobModel.create({
            ...restData,
            jobDescription: base64String,
        });

        return { success: true, message: "Job created successfully" };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Error creating Job, please try again later",
        };
    }
}

export async function fetchJobs(): Promise<JobDocument[] | null> {
    try {
        await dbConnect();

        const jobs = await JobModel.find()?.sort({ appliedOn: -1 }).lean();
        // const jobs = await JobModel.find()?.sort({ appliedOn: -1 }).limit(5).lean();

        return jobs;
    } catch (error) {
        console.error(error);
        if (error instanceof DBConnectionError) {
            redirect(DBConnectionErrorRedirectPath);
        }

        throw error;
    }
}

const decompress = promisify(gunzip);

export async function fetchJobById(
    id: string
): Promise<ApiResponse<JobDocument | null>> {
    try {
        await dbConnect();

        const job = (await JobModel.findById(id).lean()) as JobDocument | null;

        if (!job) {
            return {
                success: true,
                data: null,
            };
        }

        // decompress job description
        if (job.jobDescription) {
            const buffer = Buffer.from(job.jobDescription, "base64");

            const decompressedJobDescription = await decompress(buffer)
                .then((buffer) => buffer.toString())
                .catch((err) => {
                    console.error(`Decompression error for job id: ${id}`, err);
                    return null;
                });

            job.jobDescription = decompressedJobDescription || "";
        }

        return {
            success: true,
            data: job,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: `Error fetching Job by id: ${id}, please try again later`,
        };
    }
}

export async function fetchCountJobsAppliedToday(): Promise<
    ApiResponse<number>
> {
    try {
        await dbConnect();
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); 

        const jobs = await JobModel.find({
            appliedOn: { $gte: today, $lt: tomorrow },
        });

        return {
            success: true,
            data: jobs ? jobs.length : 0,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: `Error fetching the count of jobs applied today, please try again later`,
        };
    }
}
