import style from "./Post.module.css";
import Comment from "../Comment/Comment";
import { FaDumbbell, FaRegComment } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function Post({ post, token, userId }) {
    const { _id, image, content, user, likes, comments } = post;
    const [userLiked, setUserLiked] = useState(false);
    const [likeStyle, setLikeStyle] = useState(false);
    const [likesLength, setLikesLength] = useState(likes.length);
    const [commentsState, setCommentsState] = useState(comments);
    const [commentLength, setCommentLength] = useState(comments.length);
    const comment = useRef(null);

    const onLike = async () => {
        try {
            await axios.post(
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

    const onComment = async () => {
        const trimmedComment = comment.current.value.trim();

        if (trimmedComment !== "") {
            const res = await axios.put(
                `http://localhost:3000/post/comment/${_id}`,
                { text: trimmedComment },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCommentsState(res.data.updatedPost.comments);
            setCommentLength(commentLength + 1);
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
                            <div className={style.containerPostStatsSectionNumber}>{commentLength}</div>
                        </div>
                    </div>
                    <div className={style.containerPostContent}>{content}</div>
                </div>
                <div className={style.containerComents}>
                    {commentsState.map((e) => (
                        <Comment
                            key={e._id}
                            comment={e}
                            post={post}
                            commentLength={commentLength}
                            setCommentLength={setCommentLength}
                            commentsState={commentsState}
                            setCommentsState={setCommentsState}
                            token={token}
                        />
                    ))}
                </div>
                <div className={style.containerComment}>
                    <input placeholder="Deja tu comentario..." ref={comment} />
                    <div onClick={onComment}>Comentar</div>
                </div>
            </div>
        </div>
    );
}
