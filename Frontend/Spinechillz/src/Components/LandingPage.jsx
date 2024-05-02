import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <h1>Spinechillz</h1>
      <Link to="/login">
        <button>Log In</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default LandingPage;
