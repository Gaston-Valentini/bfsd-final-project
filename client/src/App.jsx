import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
