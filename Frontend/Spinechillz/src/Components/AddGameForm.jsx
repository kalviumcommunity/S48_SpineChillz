import React, { useState } from "react";
import axios from "axios";
import "./AddGameForm.css";

const AddGameForm = ({ onGameAdded }) => {
  // State for form fields except for added_by
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handler for input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Retrieve username from session storage at the time of submission
    const added_by = sessionStorage.getItem("username");
    if (!added_by) {
      setErrorMessage("User is not logged in. Please log in to add a game.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.title || !formData.genre) {
      setErrorMessage("Title and genre are required.");
      setIsSubmitting(false);
      return;
    }

    // Combine formData with the added_by field
    const completeFormData = { ...formData, added_by };

    try {
      const response = await axios.post(
        "http://localhost:3000/addGame",
        completeFormData,
        {
          withCredentials: true,
        }
      );
      alert("Game added successfully!");
      if (onGameAdded) onGameAdded();
      setFormData({ title: "", genre: "", releaseYear: "", rating: "" }); // Reset form
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding game:", error);
      setErrorMessage(
        "Failed to add game: " + (error.response?.data?.error || "Server error")
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-game-form">
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
      <button type="submit" disabled={isSubmitting}>
        Add Game
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default AddGameForm;
