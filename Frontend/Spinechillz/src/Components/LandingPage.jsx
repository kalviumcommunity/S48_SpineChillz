import React from "react";
import { Link } from "react-router-dom";
import Signin from "./SignIn";
import Signup from "./SignUp";

const LandingPage = () => {
  return (
    <div>
      <h1>Spinechillz</h1>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
    </div>
  );
};

export default LandingPage;
