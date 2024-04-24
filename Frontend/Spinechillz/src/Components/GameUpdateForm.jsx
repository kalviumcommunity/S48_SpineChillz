import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const GameUpdateForm = () => {
  // Initialize form state with empty fields
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
  });

  const location = useLocation(); // Access the router location
  const navigate = useNavigate(); // Access the navigation function
  const gameId = location.state?.gameId; // Extract game ID from the route state

  // Fetch game data for editing on component mount
  useEffect(() => {
    if (gameId) {
      axios
        .get(`http://localhost:3000/horrorGamesData/${gameId}`)
        .then((response) => {
          const game = response.data;
          setFormData({
            title: game.title,
            genre: game.genre,
            releaseYear: game.releaseYear,
            rating: game.rating,
          });
        })
        .catch((error) => console.error("Failed to fetch game data", error));
    }
  }, [gameId]);

  // Update form data as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated data to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/updateGame/${gameId}`, formData)
      .then(() => {
        alert("Game updated successfully!");
        navigate("/games"); // Navigate to the games list page after update
      })
      .catch((error) => alert("Error updating game: ", error));
  };

  return (
    <div>
      <h1>Update Game</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
          />
        </label>
        <br />
        <button type="submit">Update Game</button>
      </form>
    </div>
  );
};

export default GameUpdateForm;
