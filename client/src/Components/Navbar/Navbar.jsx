import "./Navbar.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { LiaBarsSolid } from "react-icons/lia";

export default function Navbar() {
    const links = useRef();
    const onBars = () => {
        links.current.classList.toggle("navbarBarsActive");
    };

    const onLogout = () => {
        localStorage.setItem("token", "");
    };

    return (
        <div className="navbar">
            <div className="navbarLogo">
                SPORT<span>SYNC</span>
            </div>
            <div>
                <LiaBarsSolid className="navbarBars" onClick={onBars} />
            </div>
            <div className="navbarLinks" ref={links}>
                <Link className="navbarLinksLink" to="/home">
                    Inicio
                </Link>
                <Link className="navbarLinksLink" to="/explore">
                    Explorar
                </Link>
                <Link className="navbarLinksLink" to="/profile">
                    Perfil
                </Link>
                <Link className="navbarLinksLinkLogout" to="/login">
                    Cerrar Sesión
                </Link>
                <Link className="navbarLinksLink" to="/login" onClick={onLogout}>
                    <CiLogout className="navbarLinksLinkIcon" />
                </Link>
            </div>
        </div>
    );
}
