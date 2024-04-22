// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express application
const app = express();
const port = 3000;

// Use middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Define schema and model for horror games
const gameSchema = new mongoose.Schema({
  title: String,
  genre: String,
  platforms: String,
  releaseYear: Number,
  rating: Number
});
const GameModel = mongoose.model('horrorgames', gameSchema);

// Define schema and model for users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number
});
const UserModel = mongoose.model('users', userSchema);

// Endpoint to check MongoDB connection status
app.get("/mongo", (req, res) => {
  const connectionStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.send(`Database Connection Status: ${connectionStatus}`);
});

// Endpoint to fetch all horror games
app.get('/horrorGamesData', async (req, res) => {
  try {
    const games = await GameModel.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server and listen on specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
