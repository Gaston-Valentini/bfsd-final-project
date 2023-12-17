import style from "./Comment.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Comment({ comment, token }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:3000/user/getUserById/${comment.user}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.userFound);
        };

        getUser();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.containerContent}>
                <div className={style.containerContentImage}>
                    <img src={user.image} />
                </div>
                <div className={style.containerContentComment}>
                    <div className={style.containerContentCommentNickname}>{user.nickname}</div>
                    <div className={style.containerContentCommentText}>{comment.text}</div>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}
