import React, { useState } from "react";
import axios from "axios";

const AddGameForm = ({ onGameAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    platforms: "",
    releaseYear: "",
    rating: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/addGame", formData)
      .then((response) => {
        alert("Game added successfully!");
        onGameAdded(formData); // callback to parent to update the list
        setFormData({
          title: "",
          genre: "",
          platforms: "",
          releaseYear: "",
          rating: "",
        }); // reset form
      })
      .catch((error) => {
        console.error("Error adding game:", error);
        alert("Failed to add game");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <input
        name="genre"
        value={formData.genre}
        onChange={handleInputChange}
        placeholder="Genre"
        required
      />
      <input
        name="platforms"
        value={formData.platforms}
        onChange={handleInputChange}
        placeholder="Platforms"
      />
      <input
        type="number"
        name="releaseYear"
        value={formData.releaseYear}
        onChange={handleInputChange}
        placeholder="Release Year"
      />
      <input
        type="number"
        name="rating"
        value={formData.rating}
        onChange={handleInputChange}
        placeholder="Rating"
      />
      <button type="submit">Add Game</button>
    </form>
  );
};

export default AddGameForm;