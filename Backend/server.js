const express = require('express');
const app = express();
app.use(express.json())
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
app.use(cors())
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.get("/mongo", (req,res)=>{
  const connectionStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  res.send(`Database Connection Status : ${connectionStatus}`)
})
// Define schema and model for horror games
const GameSchema = new mongoose.Schema({
  title: String,
  genre: String,
  platforms: String,
  releaseYear: Number,
  rating: Number
});

const GameModel = mongoose.model('horrorgames', GameSchema);

// Endpoint to get list of horror games
app.get('/horrorGamesData', async (req, res) => {
  try {
    const games = await GameModel.find();
    res.json(games);
  } catch (error) {
    console.error('Error fetching horror games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number
});

const UserModel = mongoose.model('users', UserSchema);


app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
