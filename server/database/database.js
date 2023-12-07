import mongoose from "mongoose";
import { app } from "../app/app.js";

const database = async () => {
    try {
        await mongoose.connect(app.get("DATABASE"));
        console.log("Connected to database");
    } catch (error) {
        console.error(error);
        throw new Error(`Database connection error: ${error}`);
    }
};

export { database };
