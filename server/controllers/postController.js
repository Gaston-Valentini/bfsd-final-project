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

const like = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        post.likes.push({
            user: userId,
        });

        const likedPost = await post.save();

        return res.status(200).json({
            success: true,
            message: "Me gusta añadido",
            likedPost,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

export { createPost, getUserPosts, like };
