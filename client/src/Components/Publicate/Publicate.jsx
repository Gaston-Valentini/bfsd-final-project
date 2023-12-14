import style from "./Publicate.module.css";
import { FaRegImage, FaVideo, FaPaperclip } from "react-icons/fa6";
import { AiFillAudio } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";

export default function Publicate() {
    return (
        <div className={style.container}>
            <div className={style.containerData}>
                <div className={style.containerDataImage}>
                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>
                <input className={style.containerDataText} placeholder="En que estás pensando..."></input>
            </div>
            <hr></hr>
            <div className={style.containerAttachments}>
                <div className={style.containerAttachmentsFile}>
                    <FaRegImage />
                    <div className={style.containerAttachmentsFileText}>Image</div>
                </div>
                <div className={style.containerAttachmentsFile}>
                    <FaVideo />
                    <div className={style.containerAttachmentsFileText}>Video</div>
                </div>
                <div className={style.containerAttachmentsFile}>
                    <FaPaperclip />
                    <div className={style.containerAttachmentsFileText}>Archivo</div>
                </div>
                <div className={style.containerAttachmentsFile}>
                    <AiFillAudio />
                    <div className={style.containerAttachmentsFileText}>Audio</div>
                </div>
                <div className={style.containerAttachmentsSubmit}>
                    <FaPaperPlane />
                    <div className={style.containerAttachmentsSubmitText}>PUBLICAR</div>
                </div>
            </div>
        </div>
    );
}
