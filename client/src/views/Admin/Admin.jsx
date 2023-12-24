import style from "./Admin.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../functions/isAdmin";

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate("/login");
        }
    }, []);

    return (
        <div className={style.contianer}>
            <div className={style.containerHeader}>
                <div className={style.containerHeaderTitle}>Panel de administrador</div>
                <div className={style.containerHeaderLogout}></div>
            </div>
            <div className={style.containerUsers}></div>
        </div>
    );
}
