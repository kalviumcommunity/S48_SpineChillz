import React, { useState } from "react";
import Navbar from "./Navbar";
import GameSheet from "./GameSheet";
import AddGame from "./AddGameForm";
import "./GamePage.css";
const GamesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="mainpagearea">
      <Navbar onSearchChange={handleSearchChange} />
      <AddGame />

      <GameSheet searchTerm={searchTerm} />
    </div>
  );
};

export default GamesPage;
