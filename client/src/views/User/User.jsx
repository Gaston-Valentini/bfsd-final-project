import style from "./User.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import UserCard from "../../components/UserCard/UserCard";
import Post from "../../components/Post/Post";
import Friendlist from "../../components/Friendlist/Friendlist";
import { isAuthenticated } from "../../functions/isAuthenticated";

export default function User() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        birthday: "",
        sport: "",
        image: "",
        ubication: "",
        biography: "",
        following: [],
        followers: [],
    });
    const [userLogged, setUserLogged] = useState({});
    const { id } = useParams();
    const [posts, setPosts] = useState([]);

    // Obtiene los datos del usuario que ha iniciado sesión
    const getUserLogged = async () => {
        const res = await axios.get(`http://localhost:3000/user/getUser`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUserLogged(res.data.userFound);
    };

    // Obtiene la información del usuario dueño del perfil
    const getUserById = async () => {
        const res = await axios.get(`http://localhost:3000/user/getUserById/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.userFound);
    };

    // Obtiene los posts del usuario dueño del perfil
    const getUserPostsById = async () => {
        const res = await axios.get(`http://localhost:3000/post/getUserPostsById/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts);
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getUserById();
        getUserLogged();
    }, [id, token]);

    useEffect(() => {
        getUserPostsById();
    }, [user]);

    return (
        <div className={style.container}>
            <Navbar user={user} />
            <div className={style.profile}>
                <UserCard user={user} />
                <div className={style.profilePosts}>
                    <div className={style.profilePostsTitle}>Publicaciones del usuario</div>
                    <div className={style.profilePostsList}>
                        {posts.map((e) => (
                            <Post
                                key={e._id}
                                post={e}
                                posts={posts}
                                setPosts={setPosts}
                                token={token}
                                userId={userLogged._id}
                            />
                        ))}
                    </div>
                </div>
                <Friendlist following={user.following} followers={user.followers} />
            </div>
        </div>
    );
}
