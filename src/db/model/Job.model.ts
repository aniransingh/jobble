"use server";

import { ApplicationStatus, LocationType } from "@/types/enums";
import mongoose, { Schema, Document } from "mongoose";

export interface JobDocument extends Document {
    _id: mongoose.Types.ObjectId;
    role: string;
    company: string;
    appliedOn: Date;
    city?: string;
    state?: string;
    country?: string;
    locationType: LocationType;
    package?: number; // in LPA - Lakhs Per Annum (aka per year)
    jobListingSource: string;
    jobApplicationPlatform: string;
    status: ApplicationStatus;
    jobDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

const JobSchema: Schema<JobDocument> = new Schema(
    {
        role: { type: String, required: true },
        appliedOn: { type: Date, required: true },
        company: { type: String, required: true },
        locationType: {
            type: String,
            enum: Object.values(LocationType),
            required: true,
            validate: {
                validator: function (v) {
                    // for remote: city and state should * not * be present
                    // for physical: the trio must be present
                    if (v === LocationType.Remote) {
                        return !this.city && !this.state
                    } else {
                        return !!this.city && !!this.state && !!this.country;
                    }
                },
                message: "Invalid location fields for selected location type",
            },
        },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        package: { type: Number }, // in LPA - Lakhs Per Annum (aka per year)
        jobListingSource: { type: String },
        jobApplicationPlatform: { type: String },
        status: {
            type: String,
            enum: Object.values(ApplicationStatus),
            default: ApplicationStatus.Pending,
        },
        jobDescription: { type: String },
    },
    { timestamps: true }
);

const JobModel =
    (mongoose.models.Job as mongoose.Model<JobDocument>) ||
    mongoose.model("Job", JobSchema);

export default JobModel;
