import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/Signup';
import UserData from './Components/Userdata';
import LandingPage from './Pages/LandingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userdata" element={<UserData />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
