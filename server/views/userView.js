import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/getUser", authMiddleware, getUser);

export default router;
