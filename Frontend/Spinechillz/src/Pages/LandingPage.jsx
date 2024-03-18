import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Spine Chillz</h1>
      <button><Link to="/signin">Sign In</Link></button>
      <button><Link to="/signup">Sign Up</Link></button>
      <button><Link to="/userdata">User Data</Link></button>
    </div>
  );
};

export default LandingPage;
