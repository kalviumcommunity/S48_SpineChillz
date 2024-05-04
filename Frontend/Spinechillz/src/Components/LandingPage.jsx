import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Spinechillz</h1>
      <Link to="/login">
        <button className="landing-button">Log In</button>
      </Link>
      <Link to="/register">
        <button className="landing-button">Register</button>
      </Link>
    </div>
  );
};

export default LandingPage;
