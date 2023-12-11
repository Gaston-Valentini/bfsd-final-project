// Imports
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// Settings
app.set("PORT", process.env.PORT);
app.set("DATABASE", process.env.DATABASE);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

export { app };
