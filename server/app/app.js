// Imports
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRouter from "../views/authView.js";
import userRouter from "../views/userView.js";

// Settings
app.set("PORT", process.env.PORT);
app.set("DATABASE", process.env.DATABASE);
app.set("TOKEN_SECRET", process.env.TOKEN_SECRET);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Router
app.use("/", authRouter);
app.use("/user", userRouter);

export { app };
