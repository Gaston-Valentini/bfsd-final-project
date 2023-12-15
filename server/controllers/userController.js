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

export { getUser };
