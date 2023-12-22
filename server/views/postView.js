import { Router } from "express";
import {
    createPost,
    getPostById,
    getUserPosts,
    getUserPostsById,
    getAllPosts,
    toggleLike,
    comment,
    deleteComment,
    deletePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getPostById/:id", authMiddleware, getPostById);
router.get("/getUserPosts", authMiddleware, getUserPosts);
router.get("/getUserPostsById/:id", authMiddleware, getUserPostsById);
router.get("/getAllPosts", authMiddleware, getAllPosts);
router.post("/toggleLike/:id", authMiddleware, toggleLike);
router.put("/comment/:id", authMiddleware, comment);
router.delete("/deleteComment/:id/:commentId", authMiddleware, deleteComment);
router.delete("/deletePost/:id", authMiddleware, deletePost);

export default router;
