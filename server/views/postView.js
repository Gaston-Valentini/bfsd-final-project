import { Router } from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getPosts", authMiddleware, getPosts);

export default router;
