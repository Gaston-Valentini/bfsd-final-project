import style from "./User.module.css";
import Navbar from "../../components/Navbar/Navbar";
import UserCard from "../../components/UserCard/UserCard";

export default function User() {
    return (
        <div>
            <Navbar />
            <div>
                <UserCard />
            </div>
        </div>
    );
}
