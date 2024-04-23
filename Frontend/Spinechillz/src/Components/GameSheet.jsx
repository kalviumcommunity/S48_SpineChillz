import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Gamesheet.css";

const GameSheet = ({ searchTerm = "" }) => {
  // State to store the list of games
  const [games, setGames] = useState([]);
  const navigate = useNavigate(); // Hook to perform navigation

  // Effect to fetch games on component mount
  useEffect(() => {
    fetchGames();
  }, []);

  // Function to fetch games from the server
  const fetchGames = () => {
    axios
      .get("http://localhost:3000/horrorGamesData")
      .then((response) => setGames(response.data || []))
      .catch((error) => console.error("Error fetching games data:", error));
  };

  // Function to delete a game and refresh the list
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteGame/${id}`)
      .then(() => {
        alert("Game deleted successfully");
        fetchGames(); // Re-fetch games after a deletion
      })
      .catch((error) => alert("Error deleting game:", error));
  };

  // Function to navigate to the update form with game ID
  const handleUpdate = (id) => {
    navigate(`/updategames`, { state: { gameId: id } });
  };

  // Filtering games based on search term
  const filteredGames = games.filter((game) =>
    game?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="GameSheet">
      <h2>Games List</h2>
      {filteredGames.length > 0 ? (
        <ul className="listbox">
          {filteredGames.map((game) => (
            <li key={game._id} className="listitems">
              <strong>{game.title}</strong> ({game.releaseYear})<br />
              Genre: {game.genre}
              <br />
              Rating: {game.rating}/10
              <button onClick={() => handleUpdate(game._id)}>Update</button>
              <button onClick={() => handleDelete(game._id)}>Delete</button>
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
