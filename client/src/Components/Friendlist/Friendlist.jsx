import style from "./Friendlist.module.css";
import { Link } from "react-router-dom";

export default function Friendlist({ following, followers }) {
    return (
        <div className={style.container}>
            <div className={style.containerSection}>
                <div className={style.containerSectionTitle}>Seguidos: {following.length}</div>
                <div className={style.containerSectionList}>
                    {following.map((e) => (
                        <Link key={e} to={`/user/${e._id}`} className={style.containerSectionListCard}>
                            <div className={style.containerSectionListCardImage}>
                                <img src={e.user.image} />
                            </div>
                            <div className={style.containerSectionListCardNickname}>{e.user.nickname}</div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={style.containerSection}>
                <div className={style.containerSectionTitle}>Seguidores: {followers.length}</div>
                <div className={style.containerSectionList}>
                    {followers.map((e) => (
                        <Link key={e} to={`/user/${e._id}`} className={style.containerSectionListCard}>
                            <div className={style.containerSectionListCardImage}>
                                <img src={e.user.image} />
                            </div>
                            <div className={style.containerSectionListCardNickname}>{e.user.nickname}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
