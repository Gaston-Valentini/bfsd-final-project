import { Router } from "express";
import { createPost, getPostById, getUserPosts, toggleLike, comment } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getPostById/:id", authMiddleware, getPostById);
router.get("/getUserPosts", authMiddleware, getUserPosts);
router.post("/toggleLike/:id", authMiddleware, toggleLike);
router.put("/comment/:id", authMiddleware, comment);

export default router;
