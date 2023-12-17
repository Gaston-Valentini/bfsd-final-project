import { Router } from "express";
import { createPost, getUserPosts, like, dislike } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getUserPosts", authMiddleware, getUserPosts);
router.post("/like/:id", authMiddleware, like);
router.post("/dislike/:id", authMiddleware, dislike);

export default router;
