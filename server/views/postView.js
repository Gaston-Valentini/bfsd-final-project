import { Router } from "express";
import { createPost, getUserPosts } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getUserPosts", authMiddleware, getUserPosts);

export default router;
