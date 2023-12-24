import { Router } from "express";
import {
    getUser,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserById,
    deleteUser,
    follow,
    unfollow,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/getUser", authMiddleware, getUser);
router.get("/getUserById/:id", authMiddleware, getUserById);
router.get("/getAllUsers", authMiddleware, getAllUsers);
router.put("/updateUser", authMiddleware, updateUser);
router.put("/updateUserById/:id", authMiddleware, updateUserById);
router.delete("/deleteUser/:id", authMiddleware, isAdmin, deleteUser);
router.put("/follow/:id", authMiddleware, follow);
router.put("/unfollow/:id", authMiddleware, unfollow);

export default router;
