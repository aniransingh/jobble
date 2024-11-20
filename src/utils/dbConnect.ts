import { DBConnectionError } from "@/lib/errors";
import mongoose from "mongoose";

let isConnected: boolean = false

async function dbConnect(): Promise<void> {
    // Optimization: reuse connection if already exists
    if (isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("Missing database connection string");
        }

        await mongoose.connect(mongoURI);
        isConnected = true

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        isConnected = false

        throw new DBConnectionError();
    }
}

export default dbConnect;
