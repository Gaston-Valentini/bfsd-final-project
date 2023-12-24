import style from "./Register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateField } from "../../validations/validateField";
import { jwtDecode } from "jwt-decode";

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [terms, setTerms] = useState(false);
    const [message, setMessage] = useState("");

    // Actualiza el estado con la información del usuario para un campo y actualiza el estado de errores para ese campo en caso de que existan
    const onInput = (e) => {
        const { name, value } = e.target;

        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        const isValid = validateField(name, value, data);

        setErrors((prevState) => ({
            ...prevState,
            [name]: isValid === true ? "" : isValid,
        }));
    };

    // Comprueba que los terminos y condiciones hayan sido aceptadas
    const onTerms = () => {
        if (terms === false) {
            setErrors((prevState) => ({
                ...prevState,
                terms: "",
            }));
            setTerms(true);
        } else {
            setErrors((prevState) => ({
                ...prevState,
                terms: "Debe aceptar los términos y condiciones de uso",
            }));
            setTerms(false);
        }
    };

    // Si todos los campos están completos y no hay errores registra al usuario y navega a la vista Home
    const onSubmit = async () => {
        if (Object.values(errors).every((error) => !error) && Object.keys(data).length === 6 && terms === true) {
            try {
                const res = await axios.post("http://localhost:3000/register", data);
                setMessage(res.data.message);
                localStorage.setItem("token", res.data.token);
                setTimeout(() => {
                    const decode = jwtDecode(res.data.token);
                    if (decode.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/home");
                    }
                }, 2000);
            } catch (error) {
                setErrors({
                    email: error.response.data.message,
                });
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
                    <div className={style.containerDataTitlesTitle}>Registro</div>
                    <div className={style.containerDataTitlesSubtitle}>
                        Crea una cuenta y vive el deporte en comunidad
                    </div>
                </div>
                <div className={style.containerDataForm}>
                    <div className={style.containerDataFormMessage}>{message}</div>
                    <div className={style.containerDataFormInputs}>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Nombre</div>
                            <input
                                className={style.containerDataFormInputsSectionInput}
                                maxLength={20}
                                type="text"
                                name="name"
                                onBlur={onInput}
                            />
                            <span className={style.containerDataFormInputsSectionError}>{errors.name}</span>
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Apellido</div>
                            <input
                                className={style.containerDataFormInputsSectionInput}
                                maxLength={20}
                                type="text"
                                name="surname"
                                onBlur={onInput}
                            />
                            <span className={style.containerDataFormInputsSectionError}>{errors.surname}</span>
                        </div>
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Nombre de usuario</div>
                            <input
                                className={style.containerDataFormInputsSectionInput}
                                maxLength={20}
                                type="text"
                                name="nickname"
                                onBlur={onInput}
                            />
                        </div>
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
                        <div className={style.containerDataFormInputsSection}>
                            <div className={style.containerDataFormInputsSectionTitle}>Confirmar contraseña</div>
                            <input
                                className={style.containerDataFormInputsSectionInput}
                                maxLength={20}
                                type="password"
                                name="confirmPassword"
                                onChange={onInput}
                            />
                            <span className={style.containerDataFormInputsSectionError}>{errors.confirmPassword}</span>
                        </div>
                    </div>
                    <div className={style.containerDataFormTerms}>
                        <span className={style.containerDataFormTermsText}>
                            <input type="checkbox" onClick={onTerms} />
                            <div>
                                He leído y acepto los <a href="#">Términos y Condiciones</a>
                            </div>
                        </span>
                        <span className={style.containerDataFormInputsSectionError}>{errors.terms}</span>
                    </div>
                    <div>
                        <div className={style.containerDataFormButtons}>
                            <div className={style.containerDataFormButtonsSubmit} onClick={onSubmit}>
                                Registrarse
                            </div>
                            <div className={style.containerDataFormButtonsRedirect}>
                                ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
