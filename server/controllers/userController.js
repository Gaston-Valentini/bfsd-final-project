import User from "../models/User.js";

const getUser = async (req, res) => {
    try {
        const { id } = req.user;

        const userFound = await User.findById(id);
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

        const userFound = await User.findById(id);
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

const follow = async (req, res) => {
    try {
        const { id } = req.user;
        const userId = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(id, { $push: { following: { user: userId } } }, { new: true });

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
        const userId = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(id, { $pull: { following: { user: userId } } }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Datos del usuario actualizados.",
            updatedUser,
        });
    } catch (error) {
        throw new Error(`Error interno del servidor: ${error}`);
    }
};

export { getUser, getUserById, getAllUsers, updateUser, follow, unfollow };
