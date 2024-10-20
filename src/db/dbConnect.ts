import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    // Optimization: reuse connection if already exists
    if (connection.isConnected) {
        console.log("Already connected to db");
        return;
    }

    try {
        const mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            throw new Error("Missing database connection string");
        }

        const db = await mongoose.connect(mongoURI);
        connection.isConnected = db.connections[0].readyState;

        console.log("db connected successfully");
    } catch (error) {
        console.log("db connection failed", error);
        throw new Error("Database connection failed")
    }
}

export default dbConnect;
