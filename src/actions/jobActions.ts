"use server";

import dbConnect from "@/db/dbConnect";
import JobModel, { JobDocument } from "@/db/model/Job.model";
import { createJobSchema } from "@/validation/job.validation";
import { z } from "zod";
import { gzip, gunzip } from "zlib";
import { promisify } from "util";
import { LocationType } from "@/types/enums";

const compress = promisify(gzip);

export async function createJob(
    data: z.infer<typeof createJobSchema>
): Promise<ApiResponse<null>> {
    try {
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

        await dbConnect();

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

export async function fetchJobs(): Promise<ApiResponse<JobDocument[]>> {
    try {
        await dbConnect();

        const jobs = await JobModel.find().sort({ appliedOn: -1 }).lean();

        return {
            success: true,
            data: jobs,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: error,
            message: "Error fetching Jobs, please try again later",
        };
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
