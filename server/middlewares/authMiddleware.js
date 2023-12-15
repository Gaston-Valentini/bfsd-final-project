import jwt from "jsonwebtoken";
import { app } from "../app/app.js";

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Token no proporcionado",
        });
    }

    const newToken = token.split(" ");

    jwt.verify(newToken[1], app.get("TOKEN_SECRET"), (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                mensaje: "Token inválido",
            });
        }

        req.user = decoded;

        next();
    });
}
export { authMiddleware };
