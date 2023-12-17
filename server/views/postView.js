import { Router } from "express";
import { createPost, getPostById, getUserPosts, toggleLike } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getPostById/:id", authMiddleware, getPostById);
router.get("/getUserPosts", authMiddleware, getUserPosts);
router.post("/toggleLike/:id", authMiddleware, toggleLike);

export default router;
