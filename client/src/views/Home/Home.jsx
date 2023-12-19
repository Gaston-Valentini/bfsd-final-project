import style from "./Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Publicate from "../../components/Publicate/Publicate";
import Post from "../../components/Post/Post";

export default function Home() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

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

    const reversePosts = [...posts].reverse();

    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <div className={style.containerProfile}></div>
                <div className={style.containerPosts}>
                    <Publicate user={user} token={token} />
                    <div className={style.containerPostsList}>
                        {reversePosts.map((e) => (
                            <Post key={e._id} post={e} token={token} userId={user._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
