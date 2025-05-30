import mongoose from "mongoose";

const connection: { isConnected?: number } = {}


const connection_string = process.env.MONGODB_URI!

async function connectDB() {

    if (!connection_string) {
        throw new Error("MONGODB_URI is missing from environment ");
    }

    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(connection_string);

    connection.isConnected = db.connections[0].readyState
}

export default connectDB;