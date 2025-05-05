import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
import "./CSS/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = { email, password };

    axios
      .post("/auth/login", existingUser)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        console.log("Login successful for user: ", user);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Don’t have an account?{" "}
          <button className="link-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            placeholder="Email"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
