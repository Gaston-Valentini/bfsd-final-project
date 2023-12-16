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

const getPosts = async (req, res) => {
    try {
        const { id } = req.user;

        const posts = await Post.find({ user: id });

        return res.status(200).json({
            success: true,
            message: "Publicaciones del usuario",
            posts,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

export { createPost, getPosts };
