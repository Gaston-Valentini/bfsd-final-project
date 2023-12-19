import Post from "../models/Post.js";

const createPost = async (req, res) => {
    try {
        const { id } = req.user;
        const { content, image } = req.body;
        await Post.create({ user: id, content, image });

        return res.status(201).json({
            success: true,
            message: "Publicación exitosa",
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        return res.status(201).json({
            success: true,
            post,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { id } = req.user;

        const posts = await Post.find({ user: id }).populate("user");

        return res.status(200).json({
            success: true,
            message: "Publicaciones del usuario",
            posts,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user");

        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const toggleLike = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        const userLikedIndex = post.likes.findIndex((like) => like.user.toString() === userId);

        if (userLikedIndex !== -1) {
            post.likes.splice(userLikedIndex, 1);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Me gusta eliminado",
            });
        } else {
            post.likes.push({ user: userId });
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Me gusta añadido",
            });
        }
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const comment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: { user: userId, text: req.body.text } } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Comentario añadido",
            updatedPost,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const deleteComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado",
            updatedPost,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

export { createPost, getPostById, getUserPosts, getAllPosts, toggleLike, comment, deleteComment };
