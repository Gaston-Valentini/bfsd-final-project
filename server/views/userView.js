import { Router } from "express";
import { getUser, getUserById, getAllUsers, updateUser, follow, unfollow } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/getUser", authMiddleware, getUser);
router.get("/getUserById/:id", authMiddleware, getUserById);
router.get("/getAllUsers", authMiddleware, getAllUsers);
router.put("/updateUser", authMiddleware, updateUser);
router.put("/follow/:id", authMiddleware, follow);
router.put("/unfollow/:id", authMiddleware, unfollow);

export default router;
