import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Explore from "./views/Explore/Explore";
import Profile from "./views/Profile/Profile";
import User from "./views/User/User";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
