import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
