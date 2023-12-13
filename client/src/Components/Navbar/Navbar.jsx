import "./Navbar.css";
import { useRef } from "react";
import { CiLogout } from "react-icons/ci";
import { LiaBarsSolid } from "react-icons/lia";

export default function Navbar() {
    const links = useRef();
    const onBars = () => {
        links.current.classList.toggle("navbarBarsActive");
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
                <div className="navbarLinksLink">Inicio</div>
                <div className="navbarLinksLink">Explorar</div>
                <div className="navbarLinksLink">Perfil</div>
                <div className="navbarLinksLinkLogout">Cerrar Sesión</div>
                <div className="navbarLinksLink">
                    <CiLogout className="navbarLinksLinkIcon" />
                </div>
            </div>
        </div>
    );
}
