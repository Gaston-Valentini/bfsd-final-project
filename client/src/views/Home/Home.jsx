import style from "./Home.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Publicate from "../../components/Publicate/Publicate";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <div></div>
                <Publicate />
            </div>
        </div>
    );
}
