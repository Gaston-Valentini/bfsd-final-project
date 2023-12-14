import style from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";

export default function Profile() {
    const [bio, setBio] = useState(0);
    const onBio = (e) => {
        setBio(e.target.value.length);
    };
    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <div className={style.profile}>
                    <div className={style.profileData}>
                        <div className={style.profileDataImage}>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                        </div>
                        <div className={style.profileDataNickname}>ELCAFT</div>
                    </div>
                    <div className={style.profileTitle}>Editar Perfil</div>
                    <div className={style.profileForm}>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Nombre</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Apellido</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Correo</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Teléfono</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Cumpleaños</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Deporte</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Foto de perfil</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Ubicación</div>
                            <input className={style.profileFormSectionInput} />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Biografía {bio}/500</div>
                            <textarea className={style.profileFormSectionInput} maxLength={500} onChange={onBio} />
                        </div>
                    </div>
                    <div className={style.profileSave}>Guardar</div>
                </div>
            </div>
        </div>
    );
}
