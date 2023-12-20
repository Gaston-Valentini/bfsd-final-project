import style from "./Explore.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";

export default function Explore() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    const getUserData = async () => {
        const res = await axios.get("http://localhost:3000/user/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.userFound);
    };

    const getAllUsers = async () => {
        const res = await axios.get("http://localhost:3000/user/getAllUsers", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
    };

    const isUserFollowing = (userId) => {
        return user && user.friends && user.friends.some((friend) => friend.user.toString() === userId.toString());
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getUserData();
        getAllUsers();
    }, [token]);

    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <input className={style.searchbar} placeholder="Busca usuarios..." />
                <div className={style.sorts}>
                    <div className={style.sortsTitle}>Ordenar por:</div>
                    <div className={style.sortsList}>
                        <div className={style.sortsListElement}>
                            <div className={style.sortsListElementText}>Fecha de registro</div>
                            <input className={style.sortsListElementInput} type="checkbox" />
                        </div>
                        <div className={style.sortsListElement}>
                            <div className={style.sortsListElementText}>Afabéticamente</div>
                            <input className={style.sortsListElementInput} type="checkbox" />
                        </div>
                        <div className={style.sortsListElement}>
                            <div className={style.sortsListElementText}>Popularidad</div>
                            <input className={style.sortsListElementInput} type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className={style.users}>
                    {users.map((e) => (
                        <Link className={style.usersCard} key={e._id}>
                            <div className={style.usersCardImage}>
                                <img src={e.image} alt={e.nickname} />
                            </div>
                            <div className={style.usersCardData}>
                                <p className={style.usersCardDataText}>
                                    <span className={style.usersCardDataTextNickname}>{e.nickname}</span>
                                    <br />
                                    Seguidores: {e.friends.length}
                                </p>
                                <div className={style.usersCardDataFollow}>
                                    {isUserFollowing(e._id) ? (
                                        <div>
                                            <RiUserUnfollowFill className={style.usersCardDataFollowYes} />
                                        </div>
                                    ) : (
                                        <div>
                                            <RiUserFollowFill className={style.usersCardDataFollowNo} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
