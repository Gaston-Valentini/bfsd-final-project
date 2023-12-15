import style from "./Profile.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

export default function Profile() {
    const [token, setToken] = useState("");
    const [bio, setBio] = useState(0);
    const [user, setUser] = useState({});

    const onBio = (e) => {
        setBio(e.target.value.length);
    };

    const onInput = (e, name) => {
        setUser((prevState) => ({
            ...prevState,
            [name]: e.target.value,
        }));
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        const getUserData = async () => {
            const res = await axios.get("http://localhost:3000/user/getUser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.userFound);
        };
        getUserData();
    }, [token]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <div className={style.profile}>
                    <div className={style.profileData}>
                        <div className={style.profileDataImage}>
                            <img src={user.image} />
                        </div>
                        <div className={style.profileDataNickname}>{user.nickname}</div>
                    </div>
                    <div className={style.profileTitle}>Editar Perfil</div>
                    <div className={style.profileForm}>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Nombre</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.name}
                                onChange={(e) => onInput(e, "name")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Apellido</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.surname}
                                onChange={(e) => onInput(e, "surname")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Correo</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.email}
                                onChange={(e) => onInput(e, "email")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Teléfono</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.phone}
                                onChange={(e) => onInput(e, "phone")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Cumpleaños</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.birthday}
                                onChange={(e) => onInput(e, "birthday")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Deporte</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.sport}
                                onChange={(e) => onInput(e, "sport")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Foto de perfil</div>
                            <input className={style.profileFormSectionInput} type="file" />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Ubicación</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.ubication}
                                onChange={(e) => onInput(e, "ubication")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Biografía {bio}/500</div>
                            <textarea
                                className={style.profileFormSectionInput}
                                maxLength={500}
                                readOnly={false}
                                value={user.biography}
                                onChange={(e) => {
                                    onInput(e, "biography");
                                    onBio(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.profileSave}>Guardar</div>
                </div>
            </div>
        </div>
    );
}
