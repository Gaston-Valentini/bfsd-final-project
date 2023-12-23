import style from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateField } from "../../validations/validateField";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Actualiza el estado con la información del usuario para un campo y actualiza el estado de errores para ese campo en caso de que existan
    const onInput = (e) => {
        const { name, value } = e.target;

        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Comprueba que el campo sea válido
        const isValid = validateField(name, value, data);

        setErrors((prevState) => ({
            ...prevState,
            [name]: isValid === true ? "" : isValid,
        }));
    };

    // Si todos los campos están completos y no hay errores intenta iniciar sesión y navega a la vista Home
    const onSubmit = async () => {
        if (Object.values(errors).every((error) => !error) && Object.keys(data).length === 2) {
            try {
                const res = await axios.post("http://localhost:3000/login", data);
                setMessage(res.data.message);
                localStorage.setItem("token", res.data.token);
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } catch (error) {
                if (error.response.data.message === "Contraseña incorrecta") {
                    setErrors({
                        password: error.response.data.message,
                    });
                } else {
                    setErrors({
                        email: error.response.data.message,
                    });
                }
            }
        } else {
            setMessage("El formulario tiene errores o campos incompletos");
            setTimeout(() => {
                setMessage("");
            }, 5000);
        }
    };

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
                    <div className={style.containerDataTitlesTitle}>Inicio de Sesión</div>
                    <div className={style.containerDataTitlesSubtitle}>
                        Accede a tu cuenta y conecta con atletas de todo el mundo
                    </div>
                </div>
                <div className={style.containerDataForm}>
                    <div className={style.containerDataFormMessage}>{message}</div>
                    <div className={style.containerDataFormInputs}>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Correo</div>
                            <input
                                className={style.containerDataFormInputsSectionInput}
                                maxLength={50}
                                type="email"
                                name="email"
                                onBlur={onInput}
                            />
                            <span className={style.containerDataFormInputsSectionError}>{errors.email}</span>
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Contraseña</div>
                            <input
                                className={style.containerDataFormInputsSectionInput}
                                maxLength={20}
                                type="password"
                                name="password"
                                onBlur={onInput}
                            />
                            <span className={style.containerDataFormInputsSectionError}>{errors.password}</span>
                        </div>
                    </div>
                    <div>
                        <div className={style.containerDataFormButtons}>
                            <div className={style.containerDataFormButtonsSubmit} onClick={onSubmit}>
                                Iniciar Sesión
                            </div>
                            <div className={style.containerDataFormButtonsRedirect}>
                                ¿Aún no tienes una cuenta? <Link to="/register">Regístrate</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
