import User from "../models/User.js";
import Post from "../models/Post.js";

const getUser = async (req, res) => {
    try {
        const { id } = req.user;

        const userFound = await User.findById(id)
            .populate("following.user", "nickname image")
            .populate("followers.user", "nickname image");

        return res.status(200).json({
            success: true,
            userFound,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const userFound = await User.findById(id)
            .populate("following.user", "nickname image")
            .populate("followers.user", "nickname image");
        return res.status(200).json({
            success: true,
            userFound,
            id,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.user;

        await User.findByIdAndUpdate(id, req.body);

        return res.status(200).json({
            success: true,
            message: "Datos del usuario actualizados.",
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userToDelete = await User.findById(id);

        await Promise.all([User.findByIdAndDelete(id), Post.deleteMany({ user: id })]);

        await User.updateMany({ "following.user": id }, { $pull: { following: { user: id } } });

        await User.updateMany({ "followers.user": id }, { $pull: { followers: { user: id } } });

        await User.updateMany(
            { "followers.user": { $in: userToDelete.followers.map((f) => f.user) } },
            { $pull: { followers: { user: id } } }
        );

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado y referencias actualizadas.",
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};
const follow = async (req, res) => {
    try {
        const { id } = req.user;
        const userIdToFollow = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { following: { user: userIdToFollow } } },
            { new: true }
        );

        await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: { user: id } } }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Datos del usuario actualizados.",
            updatedUser,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

const unfollow = async (req, res) => {
    try {
        const { id } = req.user;
        const userIdToUnfollow = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { following: { user: userIdToUnfollow } } },
            { new: true }
        );

        await User.findByIdAndUpdate(userIdToUnfollow, { $pull: { followers: { user: id } } }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Datos del usuario actualizados.",
            updatedUser,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

export { getUser, getUserById, getAllUsers, updateUser, deleteUser, follow, unfollow };
