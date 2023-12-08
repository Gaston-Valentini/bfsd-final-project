import style from "./Register.module.css";

export default function Register() {
    return (
        <div className={style.container}>
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
            <div className={style.containerData}>
                <div className={style.containerDataTitles}>
                    <div className={style.containerDataTitlesTitle}>Registro</div>
                    <div className={style.containerDataTitlesSubtitle}>
                        Crea una cuenta y vive el deporte en comunidad
                    </div>
                </div>
                <div className={style.containerDataForm}>
                    <div className={style.containerDataFormInputs}>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Nombre</div>
                            <input className={style.containerDataFormInputsSectionInput} type="text" />
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Apellido</div>
                            <input className={style.containerDataFormInputsSectionInput} type="text" />
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Nombre de usuario</div>
                            <input className={style.containerDataFormInputsSectionInput} type="text" />
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Correo</div>
                            <input className={style.containerDataFormInputsSectionInput} type="email" />
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Contraseña</div>
                            <input className={style.containerDataFormInputsSectionInput} type="password" />
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Confirmar contraseña</div>
                            <input className={style.containerDataFormInputsSectionInput} type="password" />
                        </div>
                    </div>
                    <div className={style.containerDataFormTerms}>
                        <input className={style.containerDataFormTermsCheckbox} type="checkbox" />{" "}
                        <span className={style.containerDataFormTermsText}>
                            He leído y acepto los <a href="#">Términos y Condiciones</a>
                        </span>
                    </div>
                    <div>
                        <div className={style.containerDataFormButtons}>
                            <div className={style.containerDataFormButtonsSubmit}>Registrarse</div>
                            <div className={style.containerDataFormButtonsRedirect}>
                                ¿Ya tienes una cuenta? <a href="#">Inicia Sesión</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
