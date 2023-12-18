import style from "./Post.module.css";
import Comment from "../Comment/Comment";
import { FaDumbbell, FaRegComment } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Post({ post, token, userId }) {
    const { _id, image, content, user, likes, comments } = post;
    const [userLiked, setUserLiked] = useState(false);
    const [likeStyle, setLikeStyle] = useState(false);
    const [likesLength, setLikesLength] = useState(likes.length);

    const onLike = async () => {
        try {
            const res = await axios.post(
                `http://localhost:3000/post/toggleLike/${_id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!userLiked) {
                setUserLiked(!userLiked);
                setLikeStyle(!likeStyle);
                setLikesLength(likesLength + 1);
            } else {
                setUserLiked(!userLiked);
                setLikeStyle(!likeStyle);
                setLikesLength(likesLength - 1);
            }
        } catch (error) {
            console.error("Error al enviar el like:", error);
        }
    };

    useEffect(() => {
        likes.map((e) => {
            if (e.user === userId) {
                setUserLiked(!userLiked);
                setLikeStyle(!likeStyle);
            }
        });
    }, []);

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
                            <FaDumbbell
                                className={
                                    likeStyle === false
                                        ? style.containerPostStatsSectionLike
                                        : style.containerPostStatsSectionLikeLiked
                                }
                                onClick={onLike}
                            />
                            <div className={style.containerPostStatsSectionNumber}>{likesLength}</div>
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
