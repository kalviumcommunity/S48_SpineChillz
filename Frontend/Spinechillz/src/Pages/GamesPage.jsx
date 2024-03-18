import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameComponent() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios.get('/api/games');
        console.log(response.data); // Log the fetched data
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching horror games:', error);
      }
    }
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Horror Games</h2>
      <ul>
        {games.map((game, index) => ( // Check if games is an array
          <li key={index}>
            <strong>Title:</strong> {game.title}<br />
            <strong>Genre:</strong> {game.genre}<br />
            <strong>Release Year:</strong> {game.releaseYear}<br />
            <strong>Platforms:</strong> {game.platforms.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameComponent;
