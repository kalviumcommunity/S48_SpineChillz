import React, { useState } from "react";
import axios from "axios";
import "./authform.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/login",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Authentication successful:", response.data);
        sessionStorage.setItem("username", username);
        navigate("/games");
      })
      .catch((error) => {
        console.error(
          "Authentication failed:",
          error.response ? error.response.data : "Server error"
        );
        setErrorMessage("Login failed. Please try again.");
      });
  };

  return (
    <form onSubmit={handleLogin} className="logform">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default Login;
