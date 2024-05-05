// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// Initialize Express application
const app = express();
const port = 3000;

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};

// Use middleware to parse JSON and enable CORS with the correct settings
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define schema and model for horror games
const gameSchema = new mongoose.Schema({
  title: String,
  genre: String,
  platforms: String,
  releaseYear: Number,
  rating: Number,
});
const GameModel = mongoose.model("horrorgames", gameSchema);

// Define schema and model for users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
});
const UserModel = mongoose.model("users", userSchema);

// Endpoint to check MongoDB connection status
app.get("/mongo", (req, res) => {
  const connectionStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.send(`Database Connection Status: ${connectionStatus}`);
});

// Endpoint to fetch all horror games
app.get("/horrorGamesData", async (req, res) => {
  try {
    const games = await GameModel.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to add a new horror game
app.post("/addGame", async (req, res) => {
  const { title, genre, releaseYear, rating } = req.body;
  const newGame = new GameModel({
    title,
    genre,
    releaseYear,
    rating,
  });

  try {
    await newGame.save();
    res.status(201).send("Game added successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to add game" });
  }
});

// Endpoint to update an existing horror game
app.put("/updateGame/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedGame = await GameModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedGame) {
      return res.status(404).send("Game not found");
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: "Failed to update game" });
  }
});

// Endpoint to delete a horror game
app.delete("/deleteGame/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGame = await GameModel.findByIdAndDelete(id);
    if (!deletedGame) {
      return res.status(404).send("Game not found");
    }
    res.send("Game deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

// joi schema for validating the user
const userSchemaJoi = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().min(5).required(),
  age: joi.number().integer().min(13).required(), // Assuming the minimum age is 13
});

// Endpoint to register a new user
app.post("/registerUser", async (req, res) => {
  const { error } = userSchemaJoi.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password, age } = req.body;
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    password: hashedPassword,
    age,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

// Start server and listen on specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
