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

export { createPost, getUserPosts, toggleLike };
