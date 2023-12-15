import { Router } from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/getUser", authMiddleware, getUser);
router.put("/updateUser", authMiddleware, updateUser);

export default router;
