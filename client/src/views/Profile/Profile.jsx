import style from "./Profile.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Post from "../../components/Post/Post";
import Friendlist from "../../components/Friendlist/Friendlist";

export default function Profile() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [bio, setBio] = useState(0);
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
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState([]);

    const onBio = (e) => {
        setBio(e.target.value.length);
    };

    const onInput = (e, name) => {
        setUser((prevState) => ({
            ...prevState,
            [name]: e.target.value,
        }));
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "nhkcnosu");
        formData.append("api_key", "548415732373855");

        const res = await axios.post("https://api.cloudinary.com/v1_1/dmltmuab5/image/upload", formData);
        user.image = res.data.secure_url;
    };

    const onSave = async () => {
        await axios.put("http://localhost:3000/user/updateUser", user, {
            headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/home");
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        const getUserData = async () => {
            const res = await axios.get("http://localhost:3000/user/getUser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.userFound);
        };

        const getUserPosts = async () => {
            const res = await axios.get("http://localhost:3000/post/getUserPosts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(res.data.posts);
        };

        getUserData();
        getUserPosts();
    }, [token]);

    const reversePosts = [...posts].reverse();

    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <div className={style.profile}>
                    <div className={style.profileData}>
                        <div className={style.profileDataImage}>
                            <img src={user.image} />
                        </div>
                        <div className={style.profileDataNickname}>{user.nickname}</div>
                    </div>
                    <div className={style.profileTitle}>Editar Perfil</div>
                    <div className={style.profileForm}>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Nombre</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.name}
                                onChange={(e) => onInput(e, "name")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Apellido</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.surname}
                                onChange={(e) => onInput(e, "surname")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Correo</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.email}
                                onChange={(e) => onInput(e, "email")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Teléfono</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.phone}
                                onChange={(e) => onInput(e, "phone")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Cumpleaños</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.birthday}
                                onChange={(e) => onInput(e, "birthday")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Deporte</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.sport}
                                onChange={(e) => onInput(e, "sport")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Foto de perfil</div>
                            <input
                                className={style.profileFormSectionInput}
                                type="file"
                                readOnly={false}
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Ubicación</div>
                            <input
                                className={style.profileFormSectionInput}
                                readOnly={false}
                                value={user.ubication}
                                onChange={(e) => onInput(e, "ubication")}
                            />
                        </div>
                        <div className={style.profileFormSection}>
                            <div className={style.profileFormSectionTitle}>Biografía {bio}/500</div>
                            <textarea
                                className={style.profileFormSectionInput}
                                maxLength={500}
                                readOnly={false}
                                value={user.biography}
                                onChange={(e) => {
                                    onInput(e, "biography");
                                    onBio(e);
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className={style.profileSave}
                        onClick={async () => {
                            if (image !== "") {
                                await uploadImage();
                                onSave();
                            }
                            onSave();
                        }}
                    >
                        Guardar
                    </div>
                </div>
                <div className={style.posts}>
                    <div className={style.postsTitle}>Tus Publicaciones</div>
                    <div className={style.postsList}>
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
                <Friendlist following={user.following} followers={user.followers} />
            </div>
        </div>
    );
}
