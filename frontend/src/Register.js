import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

const Register = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            firstName: fname,
            lastName: lname,
            email,
            password
        };
        axios.post("/auth/register", newUser)
        .then(res => {
            console.log(res.data.message);
            navigate("/");
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <div>
                <h1> Register </h1>
                <p>Already have an account? <button onClick={() => navigate("/")}>Login</button></p>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={fname} onChange = {(e) => setFname(e.target.value)} placeholder="First Name"/>
                <input type="text" value={lname} onChange = {(e) => setLname(e.target.value)} placeholder="Last Name"/>
                <input type="email" value={email} onChange = {(e) => setEmail(e.target.value)} placeholder="Email Address"/>
                <input type="password" value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Create Password"/>
                <button type="submit">Register User</button>
            </form>
        </div>
    )
}

export default Register;