import style from "./Explore.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

export default function Explore() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

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
        const filteredUsers = res.data.users.filter((e) => e._id !== user._id);
        setUsers(filteredUsers);
    };

    const isUserFollowing = (userId) => {
        return (
            user && user.following && user.following.some((follower) => follower.user.toString() === userId.toString())
        );
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredUsers = users.filter((user) => user?.nickname?.toLowerCase().includes(search.toLowerCase()));

    const onFollow = async (targetUser) => {
        const res = await axios.put(
            `http://localhost:3000/user/follow/${targetUser._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log(res);
        setUser(res.data.updatedUser);
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((u) =>
                u._id === targetUser._id ? { ...u, following: res.data.updatedUser.following } : u
            );
            return updatedUsers;
        });
    };

    const onUnfollow = async (targetUser) => {
        const res = await axios.put(
            `http://localhost:3000/user/unfollow/${targetUser._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log(res);
        setUser(res.data.updatedUser);
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((u) =>
                u._id === targetUser._id ? { ...u, following: res.data.updatedUser.following } : u
            );
            return updatedUsers;
        });
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getUserData();
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
                    {filteredUsers.map((e) => (
                        <Link className={style.usersCard} key={e._id}>
                            <div className={style.usersCardImage}>
                                <img src={e.image} alt={e.nickname} />
                            </div>
                            <div className={style.usersCardData}>
                                <p className={style.usersCardDataText}>
                                    <span className={style.usersCardDataTextNickname}>{e.nickname}</span>
                                    <br />
                                    Seguidores: {e.followers.length}
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
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
