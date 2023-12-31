import style from "./Comment.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function Comment({ comment, post, commentLength, setCommentLength, setCommentsState, userId, token }) {
    const [user, setUser] = useState({});

    // Obtiene la información del usuario que ha hecho la publicaciónS
    const getUser = async () => {
        const res = await axios.get(`http://localhost:3000/user/getUserById/${comment.user}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.userFound);
    };

    // Elimina el comentario
    const onDelete = async () => {
        const res = await axios.delete(`http://localhost:3000/post/deleteComment/${post._id}/${comment._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCommentLength(commentLength - 1);
        setCommentsState(res.data.updatedPost.comments);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.containerContent}>
                <div className={style.containerContentImage}>
                    <img src={user.image} />
                </div>
                <div className={style.containerContentComment}>
                    <div className={style.containerContentCommentWords}>
                        {comment.user !== userId ? (
                            <Link to={`/user/${user._id}`} className={style.containerContentCommentWordsNickname}>
                                {user.nickname}
                            </Link>
                        ) : (
                            <div className={style.containerContentCommentWordsNickname}>{user.nickname}</div>
                        )}
                        <div className={style.containerContentCommentWordsText}>{comment.text}</div>
                    </div>
                    {userId === comment.user ? (
                        <div className={style.containerContentCommentDelete} onClick={onDelete}>
                            <FaTrashAlt className={style.containerContentCommentDeleteIcon} />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
