import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { app } from "../app/app.js";

const register = async (req, res) => {
    try {
        const { name, surname, nickname, email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).json({
                success: false,
                message: "Ya existe un usuario registrado con ese correo electrónico",
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const userRegistered = await User.create({
            name,
            surname,
            nickname,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: userRegistered._id }, app.get("TOKEN_SECRET"));

        return res.status(200).json({
            success: true,
            message: "Usuario registrado correctamente",
            token,
        });
    } catch (error) {
        throw new Error(`Error interno en el servidor ${error}`);
    }
};

export { register };
