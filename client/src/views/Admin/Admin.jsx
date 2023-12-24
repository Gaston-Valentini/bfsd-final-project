import style from "./Admin.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isAdmin } from "../../functions/isAdmin";
import { getDate } from "../../functions/getDate";

export default function Admin() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [users, setUsers] = useState([]);

    // Obtiene la información de los usarios registrados en la aplicación
    const getAllUsers = async () => {
        const res = await axios.get("http://localhost:3000/user/getAllUsers", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
    };

    // Rastrea los cambios de los usuarios y actualiza su estado
    const onInputChange = (event, userId, field) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user._id === userId ? { ...user, [field]: event.target.value } : user))
        );
    };

    // Guarda los cambios del usuario
    const onSave = async (userId) => {
        const newUser = users.find((user) => user._id === userId);
        try {
            await axios.put(`http://localhost:3000/user/updateUserById/${userId}`, newUser, {
                headers: { Authorization: `Bearer ${token}` },
            });

            getAllUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Elimina un usuario
    const onDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/user/deleteUser/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            getAllUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Cierra la sesión de administrador
    const onLogout = () => {
        localStorage.setItem("token", "");
        navigate("/login");
    };

    useEffect(() => {
        if (!isAdmin()) {
            navigate("/login");
        }
        setToken(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        getAllUsers();
    }, [token]);

    return (
        <div className={style.container}>
            <div className={style.containerHeader}>
                <div className={style.containerHeaderTitle}>Panel de administrador</div>
                <div className={style.containerHeaderLogout} onClick={onLogout}>
                    Salir
                </div>
            </div>
            <div className={style.containerUsers}>
                <table className={style.containerUsersTable}>
                    <thead>
                        <tr>
                            <th>_id</th>
                            <th>Nombre de usuario</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Fecha de creación</th>
                            <th>Última actualización</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <input value={user._id} disabled />
                                </td>
                                <td>
                                    <input value={user.nickname} disabled />
                                </td>
                                <td>
                                    <input
                                        value={user.name}
                                        name="name"
                                        onChange={(event) => onInputChange(event, user._id, "name")}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={user.surname}
                                        name="surname"
                                        onChange={(event) => onInputChange(event, user._id, "surname")}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={user.email}
                                        name="email"
                                        onChange={(event) => onInputChange(event, user._id, "email")}
                                    />
                                </td>
                                <td>
                                    <select name="role" onChange={(event) => onInputChange(event, user._id, "role")}>
                                        <option>{user.role}</option>
                                        <option>{user.role === "user" ? "admin" : "user"}</option>
                                    </select>
                                </td>
                                <td>
                                    <input value={getDate(user.createdAt)} disabled />
                                </td>
                                <td>
                                    <input value={getDate(user.updatedAt)} disabled />
                                </td>
                                <td>
                                    <div className={style.save} onClick={() => onSave(user._id)}>
                                        Guardar
                                    </div>
                                </td>
                                <td>
                                    <div className={style.delete} onClick={() => onDelete(user._id)}>
                                        Eliminar
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
