import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Reset previous error

    try {
      const response = await axios.post("https://excel-visualizer.onrender.com/api/login", {
        email,
        password,
      });

      console.log("Login success:");

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true"); // ✅ Add this


      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || "Login failed");
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
