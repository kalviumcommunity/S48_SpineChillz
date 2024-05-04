import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    <form onSubmit={handleLogin}>
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
      navigate("/games");
    </form>
  );
}

export default Login;
