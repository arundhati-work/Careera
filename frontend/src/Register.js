import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
import "./CSS/Register.css";

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
      password,
    };
    axios
      .post("/auth/register", newUser)
      .then((res) => {
        console.log(res.data.message);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">
          Already have an account?{" "}
          <button className="link-btn" onClick={() => navigate("/")}>
            Login
          </button>
        </p>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="First Name"
            className="register-input"
          />
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Last Name"
            className="register-input"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="register-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
            className="register-input"
          />
          <button type="submit" className="register-submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
