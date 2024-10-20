import { z } from "zod";
import { NAME_REGEX } from "@/lib/regex";

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 30;

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, {
            message: "Email is required",
        })
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(1, {
            message: "Password is required",
        })
        .min(MIN_PASSWORD_LENGTH, {
            message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        })
        .max(MAX_PASSWORD_LENGTH, {
            message: `Password cannot be longer than ${MAX_PASSWORD_LENGTH} characters`,
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number",
        })
        .regex(/[\W_]/, {
            message: "Password must contain at least one special character",
        }),
});

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 60;

export const registerSchema = loginSchema
    .extend({
        firstName: z
            .string()
            .trim()
            .min(1, {
                message: "First Name is required",
            })
            .min(MIN_NAME_LENGTH, {
                message: `First Name must be at least ${MIN_NAME_LENGTH} characters long`,
            })
            .max(MAX_NAME_LENGTH, {
                message: `First Name cannot be longer than ${MAX_NAME_LENGTH} characters`,
            })
            .regex(NAME_REGEX, {
                message:
                    "First Name can only include letters, spaces, hyphens, or apostrophes",
            }),
        lastName: z
            .string()
            .trim()
            .min(1, {
                message: "Last Name is required",
            })
            .min(MIN_NAME_LENGTH, {
                message: `Last Name must be at least ${MIN_NAME_LENGTH} characters long`,
            })
            .max(MAX_NAME_LENGTH, {
                message: `Last Name cannot be longer than ${MAX_NAME_LENGTH} characters`,
            })
            .regex(NAME_REGEX, {
                message:
                    "Last Name can only include letters, spaces, hyphens, or apostrophes",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const verifySchema = z.object({
    code: z
        .string()
        .length(6, { message: "Verification code must be 6 digits long" }),
});
