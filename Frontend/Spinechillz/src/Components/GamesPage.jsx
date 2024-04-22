import React, { useState } from "react";
import Navbar from "./Navbar";
import GameSheet from "./GameSheet";
import AddGame from "./AddGameForm";

const GamesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div>
      <Navbar onSearchChange={handleSearchChange} />
      <GameSheet searchTerm={searchTerm} />
      <AddGame />
    </div>
  );
};

export default GamesPage;
