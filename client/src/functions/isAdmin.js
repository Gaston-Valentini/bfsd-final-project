import { jwtDecode } from "jwt-decode";

export const isAdmin = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.role === "admin") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
