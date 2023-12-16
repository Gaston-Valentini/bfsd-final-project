import { Router } from "express";
import { getUser, getUserById, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/getUser", authMiddleware, getUser);
router.get("/getUserById/:id", authMiddleware, getUserById);
router.put("/updateUser", authMiddleware, updateUser);

export default router;
