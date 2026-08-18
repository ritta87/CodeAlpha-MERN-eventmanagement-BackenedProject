import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/user/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            navigate("/admin/dashboard");

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Cannot connect to server");
            }
        }
    };

    return (
        <>
        <div className="login-page">
            <div className="login-card">
            <h2>Welcome to Event Hub 👋</h2>
            <p className="login-subtitle">
                Login to register for events
                 </p>
            <form onSubmit={handleLogin} className="login-form">

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

                {error && <p className="login-error">{error}</p>}

            </form>
            <p className="admin-login-link">Admin? 
                <Link to="/admin/login">Admin Login</Link>
            </p>
            
   </div> </div> 
   </>)
}

export default AdminLogin