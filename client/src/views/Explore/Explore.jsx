import style from "./Explore.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { isAuthenticated } from "../../functions/isAuthenticated.js";

export default function Explore() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [dateSort, setDateSort] = useState(true);
    const [alphabetSort, setAlphabetSort] = useState(false);
    const [followersSort, setFollowersSort] = useState(false);

    // Obtiene la información del usuario que ha iniciado sesión
    const getUserData = async () => {
        const res = await axios.get("http://localhost:3000/user/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.userFound);
    };

    // Obtiene la información de los usarios registrados en la aplicación
    const getAllUsers = async () => {
        const res = await axios.get("http://localhost:3000/user/getAllUsers", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const filteredUsers = res.data.users.filter((e) => e._id !== user._id && e.role !== "admin");
        setUsers(filteredUsers);
    };

    // Comprueba si el usuario que ha iniciado sesión sigue o no a un usuario y retorna un valor booleano
    const isUserFollowing = (userId) => {
        return (
            user && user.following && user.following.some((follower) => follower.user.toString() === userId.toString())
        );
    };

    // Agrega un usuario a los seguidores del usuario que ha iniciado sesión
    const onFollow = async (targetUser) => {
        const res = await axios.put(
            `http://localhost:3000/user/follow/${targetUser._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        setUser(res.data.updatedUser);
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((u) =>
                u._id === targetUser._id ? { ...u, following: res.data.updatedUser.following } : u
            );
            return updatedUsers;
        });
        getAllUsers();
    };

    // Agrega un usuario a los seguidores del usuario que ha iniciado sesión
    const onUnfollow = async (targetUser) => {
        const res = await axios.put(
            `http://localhost:3000/user/unfollow/${targetUser._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        setUser(res.data.updatedUser);
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((u) =>
                u._id === targetUser._id ? { ...u, following: res.data.updatedUser.following } : u
            );
            return updatedUsers;
        });
        getAllUsers();
    };

    // Ordena la lista de usuarios registrados en la aplicación
    const onSort = (e) => {
        switch (e.target.name) {
            case "date":
                setDateSort(true);
                setAlphabetSort(false);
                setFollowersSort(false);

                function sortByDate(a, b) {
                    const createdAtA = new Date(a.createdAt).getTime();
                    const createdAtB = new Date(b.createdAt).getTime();

                    return createdAtA - createdAtB;
                }

                users.sort(sortByDate);
                break;
            case "alphabet":
                setDateSort(false);
                setAlphabetSort(true);
                setFollowersSort(false);

                function sortByAlphabet(a, b) {
                    const nicknameA = a.nickname.toLowerCase();
                    const nicknameB = b.nickname.toLowerCase();
                    if (nicknameA < nicknameB) {
                        return -1;
                    }
                    if (nicknameA > nicknameB) {
                        return 1;
                    }
                    return 0;
                }

                users.sort(sortByAlphabet);
                break;
            case "followers":
                setDateSort(false);
                setAlphabetSort(false);
                setFollowersSort(true);

                function sortByFollowers(a, b) {
                    const followersA = a.followers.length;
                    const followersB = b.followers.length;

                    return followersB - followersA;
                }

                users.sort(sortByFollowers);
                break;
            default:
                break;
        }
    };

    // Actualiza el estado que contiene el valor de la barra de búsqueda
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Almacena los usuarios que coinciden con la búsqueda
    const filteredUsers = users.filter((user) => user?.nickname?.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
        setToken(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        getUserData();
        getAllUsers();
    }, [token]);

    useEffect(() => {
        getAllUsers();
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <input
                    className={style.searchbar}
                    placeholder="Busca usuarios..."
                    value={search}
                    onChange={handleSearch}
                />
                <div className={style.sorts}>
                    <div className={style.sortsTitle}>Ordenar por:</div>
                    <div className={style.sortsList}>
                        <div className={style.sortsListElement}>
                            <div className={style.sortsListElementText}>Fecha de registro</div>
                            <input
                                className={style.sortsListElementInput}
                                type="checkbox"
                                checked={dateSort}
                                name="date"
                                onChange={(e) => {
                                    onSort(e);
                                }}
                            />
                        </div>
                        <div className={style.sortsListElement}>
                            <div className={style.sortsListElementText}>Afabéticamente</div>
                            <input
                                className={style.sortsListElementInput}
                                type="checkbox"
                                checked={alphabetSort}
                                name="alphabet"
                                onChange={(e) => {
                                    onSort(e);
                                }}
                            />
                        </div>
                        <div className={style.sortsListElement}>
                            <div className={style.sortsListElementText}>Popularidad</div>
                            <input
                                className={style.sortsListElementInput}
                                type="checkbox"
                                checked={followersSort}
                                name="followers"
                                onChange={(e) => {
                                    onSort(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.users}>
                    {filteredUsers.map((e) => (
                        <div className={style.usersCard} key={e._id}>
                            <div className={style.usersCardImage}>
                                <img src={e.image} alt={e.nickname} />
                            </div>
                            <div className={style.usersCardData}>
                                <p className={style.usersCardDataText}>
                                    <Link to={`/user/${e._id}`} className={style.usersCardDataTextNickname}>
                                        {e.nickname}
                                    </Link>
                                    <br />
                                    Seguidores: {e.followers.length}
                                    <br />
                                    Seguidos: {e.following.length}
                                </p>
                                <div className={style.usersCardDataFollow}>
                                    {isUserFollowing(e._id) ? (
                                        <div>
                                            <RiUserUnfollowFill
                                                className={style.usersCardDataFollowYes}
                                                onClick={() => onUnfollow(e)}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <RiUserFollowFill
                                                className={style.usersCardDataFollowNo}
                                                onClick={() => onFollow(e)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
