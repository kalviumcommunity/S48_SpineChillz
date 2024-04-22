import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import Signup from "./Components/SignUp.jsx";
import Signin from "./Components/SignIn.jsx";
import GamesPage from "./Components/GamesPage.jsx";
import AddGame from "./Components/AddGameForm.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/addgames" element={<AddGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
