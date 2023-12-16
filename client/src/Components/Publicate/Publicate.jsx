import style from "./Publicate.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegImage } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";

export default function Publicate({ user, token }) {
    const [post, setPost] = useState({});
    const [image, setImage] = useState({});

    const onInput = (e, name) => {
        setPost((prevState) => ({
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
        post.image = res.data.secure_url;
    };

    const onSave = async () => {
        await axios.post("http://localhost:3000/post/createPost", post, {
            headers: { Authorization: `Bearer ${token}` },
        });
    };

    useEffect(() => {
        console.log(post);
    }, [post]);

    return (
        <div className={style.container}>
            <div className={style.containerData}>
                <div className={style.containerDataImage}>
                    <img src={user.image} />
                </div>
                <input
                    className={style.containerDataText}
                    placeholder="En que estás pensando..."
                    onChange={(e) => onInput(e, "content")}
                ></input>
            </div>
            <hr></hr>
            <div className={style.containerImage}>
                <div className={style.containerImageFile}>
                    <FaRegImage />
                    <input
                        className={style.containerImageSubmitFile}
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div
                    className={style.containerImageSubmit}
                    onClick={async () => {
                        await uploadImage();
                        onSave();
                    }}
                >
                    <FaPaperPlane />
                    <div className={style.containerImageSubmitText}>PUBLICAR</div>
                </div>
            </div>
        </div>
    );
}
