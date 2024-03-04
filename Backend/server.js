const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Check and send database connection status
app.get('/', (req, res) => {
  const status = db.readyState === 1 ? 'Connected' : 'Disconnected';
  res.send(`Database Connection Status: ${status}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
