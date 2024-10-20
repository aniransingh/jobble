import { ApplicationStatus, LocationType } from "@/types/enums";
import { z } from "zod";

export const createJobSchema = z
    .object({
        role: z.string().min(1, "Role is required"),
        company: z.string().min(1, "Company is required"),
        appliedOn: z.date({ required_error: "Date is required" }),
        // ! tried doing transform() to convert string to number
        // ! but ts is ignoring the fact package even was a string in intermediary step and wants a number directly as input
        salary: z.number().optional(),
        locationType: z.nativeEnum(LocationType),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        jobListingSource: z.string().min(1, "Job Listing Source is required"),
        jobApplicationPlatform: z
            .string()
            .min(1, "Job Application Platform is required"),
        status: z.nativeEnum(ApplicationStatus),
        jobDescription: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.locationType === LocationType.Physical) {
                return data.city;
            } else {
                return true
            }
        },
        {
            message: "City is required",
            path: ["city"],
        }
    )
    .refine(
        (data) => {
            if (data.locationType === LocationType.Physical) {
                return data.state;
            } else {
                return true
            }
        },
        {
            message: "State is required",
            path: ["state"],
        }
    )
    .refine(
        (data) => {
            if (data.locationType === LocationType.Physical) {
                return data.country;
            } else {
                return true
            }
        },
        {
            message: "Country is required",
            path: ["country"],
        }
    );
