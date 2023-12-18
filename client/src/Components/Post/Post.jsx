import style from "./Post.module.css";
import Comment from "../Comment/Comment";
import { FaDumbbell, FaRegComment } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";

export default function Post({ post, token }) {
    const { _id, image, content, user, likes, comments } = post;

    const onLike = async () => {
        try {
            const res = await axios.post(
                `http://localhost:3000/post/toggleLike/${_id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(res);
        } catch (error) {
            console.error("Error al enviar el like:", error);
        }
    };

    return (
        <div>
            <div className={style.container}>
                <div className={style.containerUser}>
                    <div className={style.containerUserImage}>
                        <img src={user.image} />
                    </div>
                    <div className={style.containerUserNickname}>{user.nickname}</div>
                </div>
                <div className={style.containerPost}>
                    <div className={style.containerPostImage}>
                        <img src={image} />
                    </div>
                    <div className={style.containerPostStats}>
                        <div className={style.containerPostStatsSection}>
                            <FaDumbbell className={style.containerPostStatsSectionLike} onClick={onLike} />
                            <div className={style.containerPostStatsSectionNumber}>{likes.length}</div>
                        </div>
                        <div className={style.containerPostStatsSection}>
                            <FaRegComment className={style.containerPostStatsSectionComment} />
                            <div className={style.containerPostStatsSectionNumber}>{comments.length}</div>
                        </div>
                    </div>
                    <div className={style.containerPostContent}>{content}</div>
                </div>
                <div className={style.containerComents}>
                    {comments.map((e) => (
                        <Comment key={e._id} comment={e} token={token} />
                    ))}
                </div>
                <div className={style.containerComment}>
                    <input placeholder="Deja tu comentario..." />
                    <div>Comentar</div>
                </div>
            </div>
        </div>
    );
}
