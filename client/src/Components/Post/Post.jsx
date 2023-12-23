import style from "./Post.module.css";
import { useEffect, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Comment from "../Comment/Comment";
import { FaDumbbell, FaRegComment } from "react-icons/fa";
import { getDate } from "../../functions/getDate";

export default function Post({ post, posts, setPosts, token, userId }) {
    const { _id, image, content, user, likes, comments } = post;
    const [userLiked, setUserLiked] = useState(false);
    const [likeStyle, setLikeStyle] = useState(false);
    const [likesLength, setLikesLength] = useState(likes.length);
    const [commentsState, setCommentsState] = useState(comments);
    const [commentLength, setCommentLength] = useState(comments.length);
    const comment = useRef(null);

    // Añade un me gusta al post
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

    // Añade un comentario al post
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

        comment.current.value = "";
    };

    // Elimina el post
    const onDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/post/deletePost/${post._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const newPosts = posts.filter((e) => e._id !== post._id);

            setPosts(newPosts);
        } catch (error) {
            console.log(error);
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
                    {user._id !== userId ? ( // <-- Condición añadida aquí
                        <Link to={`/user/${user._id}`} className={style.containerUserNickname}>
                            {user.nickname}
                        </Link>
                    ) : (
                        <div className={style.containerUserNickname}>{user.nickname}</div>
                    )}
                </div>
                <div className={style.containerPost}>
                    <div className={style.containerPostImage}>
                        <img src={image} />
                    </div>
                    <div className={style.containerPostContent}>{content}</div>
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
                </div>
                <div className={style.containerComents}>
                    {commentsState.map((e) => (
                        <Fragment key={e._id}>
                            <Comment
                                key={e._id}
                                comment={e}
                                post={post}
                                commentLength={commentLength}
                                setCommentLength={setCommentLength}
                                setCommentsState={setCommentsState}
                                userId={userId}
                                token={token}
                            />
                            <hr />
                        </Fragment>
                    ))}
                </div>
                <div className={style.containerComment}>
                    <input placeholder="Deja tu comentario..." ref={comment} />
                    <div onClick={onComment}>Comentar</div>
                </div>
                <div className={style.containerDelete}>
                    <div className={style.containerDeleteDate}>Publicado el: {getDate(post.createdAt)}</div>
                    {user._id === userId ? (
                        <div className={style.containerDeleteButton} onClick={onDeletePost}>
                            Eliminar
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
