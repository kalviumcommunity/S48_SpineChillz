import React, { useState, useEffect } from "react";
import axios from "axios";

const GameSheet = ({ searchTerm = "" }) => {
  // State to store games data
  const [games, setGames] = useState([]);

  // Fetch games data from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/horrorGamesData")
      .then((response) => {
        setGames(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching games data:", error);
      });
  }, []);

  // Filter games based on the search term, handling potential undefined properties
  const filteredGames = games.filter((game) =>
    game?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Games List</h2>
      {filteredGames.length > 0 ? (
        <ul>
          {filteredGames.map((game, index) => (
            <li key={index}>
              <strong>{game.title}</strong> ({game.releaseYear})<br />
              Genre: {game.genre}
              <br />
              Rating: {game.rating}/10
            </li>
          ))}
        </ul>
      ) : (
        <p>No games found based on your search criteria.</p>
      )}
    </div>
  );
};

export default GameSheet;
