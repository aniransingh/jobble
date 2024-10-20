import { compareValue, hashValue } from "@/utils/bcrypt";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city?: string;
    state?: string;
    country?: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    jobs: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    comparePassword(value: string): Promise<boolean>;
    omitPassword(): Omit<UserDocument, "password">;
}

const UserSchema: Schema<UserDocument> = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        lastName: { type: String, trim: true, lowercase: true, required: true },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: { type: String, required: true },
        city: { type: String, trim: true, lowercase: true },
        state: { type: String, trim: true, lowercase: true },
        country: { type: String, trim: true, lowercase: true },
        verifyCode: { type: String, required: true },
        verifyCodeExpiry: { type: Date, required: true },
        isVerified: { type: Boolean, default: false },
        jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    },
    { timestamps: true }
);

// hashing password
UserSchema.pre("save", async function () {
    // DO NOT rehash password if it hasn't been modified
    if (!this.isModified("password")) {
        return;
    }

    this.password = await hashValue(this.password);
});

UserSchema.methods.comparePassword = async function (value: string) {
    return await compareValue(value, this.password);
};

UserSchema.methods.omitPassword = function () {
    const user = this.Object();
    delete user.password;
    return user;
};

const UserModel =
    (mongoose.models.User as mongoose.Model<UserDocument>) ||
    mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
