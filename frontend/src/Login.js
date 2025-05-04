import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingUser = {
            email,
            password
        }
        axios.post("/auth/login", existingUser)
        .then(res => {
            const {token, user} = res.data;
            localStorage.setItem("token", token);
            console.log("Login successful for user: ", user);
            navigate("/dashboard");
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <p>Dont have an account?  <button onClick={() => navigate("/register")}>Register</button></p>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Password"onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;