// SignUp.jsx

import React from 'react';

const SignUp = () => {
  return (
    <div>
      <h2>Sign Up Page</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
