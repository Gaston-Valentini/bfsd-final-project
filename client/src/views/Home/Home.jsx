import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import UserCard from "../../components/UserCard/UserCard";
import Publicate from "../../components/Publicate/Publicate";
import Post from "../../components/Post/Post";
import { isAuthenticated } from "../../functions/isAuthenticated.js";

export default function Home() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        const getUserData = async () => {
            const res = await axios.get("http://localhost:3000/user/getUser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.userFound);
        };

        const getAllPosts = async () => {
            const res = await axios.get(`http://localhost:3000/post/getAllPosts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(res.data.posts);
        };

        getUserData();
        getAllPosts();
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, []);

    const reversePosts = [...posts].reverse();

    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <UserCard user={user} />
                <div className={style.containerPosts}>
                    <Publicate user={user} setPosts={setPosts} token={token} />
                    <div className={style.containerPostsList}>
                        {reversePosts.map((e) => (
                            <Post
                                key={e._id}
                                post={e}
                                posts={posts}
                                setPosts={setPosts}
                                token={token}
                                userId={user._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
