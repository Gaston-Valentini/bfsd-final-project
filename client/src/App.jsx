import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./views/Register/Register";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
