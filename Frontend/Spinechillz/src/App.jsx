import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import GamesPage from "./Components/GamesPage.jsx";
import AddGame from "./Components/AddGameForm.jsx";
import UpdateGames from "./Components/GameUpdateForm.jsx";
import Login from "./Components/Login.jsx";
import Logout from "./Components/logout.jsx";
import Register from "./Components/Register.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/addgames" element={<AddGame />} />
        <Route path="/updategames" element={<UpdateGames />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
