import { Router } from "express";
import { createPost, getUserPosts, like } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getUserPosts", authMiddleware, getUserPosts);
router.post("/like/:id", authMiddleware, like);

export default router;
