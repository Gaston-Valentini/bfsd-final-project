import style from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className={style.container}>
            <div className={style.containerData}>
                <div className={style.containerDataTitles}>
                    <div className={style.containerDataTitlesTitle}>Inicio de Sesión</div>
                    <div className={style.containerDataTitlesSubtitle}>
                        Accede a tu cuenta y conecta con atletas de todo el mundo.
                    </div>
                </div>
                <div className={style.containerDataForm}>
                    <div className={style.containerDataFormInputs}>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Correo</div>
                            <input className={style.containerDataFormInputsSectionInput} type="email" />
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Contraseña</div>
                            <input className={style.containerDataFormInputsSectionInput} type="password" />
                        </div>
                    </div>
                    <div>
                        <div className={style.containerDataFormButtons}>
                            <div className={style.containerDataFormButtonsSubmit}>Iniciar Sesión</div>
                            <div className={style.containerDataFormButtonsRedirect}>
                                ¿Aún no tienes una cuenta? <Link to="/register">Regístrate</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.containerImage}>
                <div className={style.containerImageBackground}>
                    <div className={style.containerImageLogo}>
                        SPORT<span>SYNC</span>
                    </div>
                    <div className={style.containerImageSlogan}>
                        Más que una red, una comunidad que vive, respira y... suda!!
                    </div>
                </div>
            </div>
        </div>
    );
}
