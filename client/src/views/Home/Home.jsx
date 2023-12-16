import style from "./Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Publicate from "../../components/Publicate/Publicate";

export default function Home() {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");

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

    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <div></div>
                <Publicate user={user} token={token} />
            </div>
        </div>
    );
}
