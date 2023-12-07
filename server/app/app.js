// Imports
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// Settings
app.set("PORT", process.env.PORT);
app.set("DATABASE", process.env.DATABASE);

export { app };
