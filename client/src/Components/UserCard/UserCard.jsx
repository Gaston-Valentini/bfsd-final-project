import style from "./UserCard.module.css";
import { getDate } from "../../functions/getDate";

export default function UserCard({ user }) {
    return (
        <div className={style.container}>
            <div className={style.containerHeader}>
                <div className={style.containerHeaderImage}>
                    <img src={user.image} />
                </div>
                <div className={style.containerHeaderNickname}>{user.nickname}</div>
            </div>
            <div className={style.containerData}>
                <div className={style.containerDataElement}>
                    Nombre: <span>{user.name}</span>
                </div>
                <div className={style.containerDataElement}>
                    Apellido: <span>{user.surname}</span>
                </div>
                <div className={style.containerDataElement}>
                    Corrreo: <span>{user.email}</span>
                </div>
                <div className={style.containerDataElement}>
                    Teléfono: <span>{user.phone}</span>
                </div>
                <div className={style.containerDataElement}>
                    Cumpleaños: <span>{user.birthday}</span>
                </div>
                <div className={style.containerDataElement}>
                    Deporte: <span>{user.sport}</span>
                </div>
                <div className={style.containerDataElement}>
                    Ubicación: <span>{user.ubication}</span>
                </div>
                <div className={style.containerDataElement}>
                    Biografía: <span>{user.biography}</span>
                </div>
                <div className={style.containerDataElement}>
                    Seguidos: <span>{user.following ? user.following.length : 0}</span>
                </div>
                <div className={style.containerDataElement}>
                    Seguidores: <span>{user.followers ? user.followers.length : 0}</span>
                </div>
                <div className={style.containerDataElement}>
                    Creó su cuenta: <span>{getDate(user.createdAt)}</span>
                </div>
                <div className={style.containerDataElement}>
                    Última actualización: <span>{getDate(user.updatedAt)}</span>
                </div>
            </div>
        </div>
    );
}
