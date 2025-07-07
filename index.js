import dotenv from 'dotenv';
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Save user
app.post('/submit', (req, res) => {
  const { name, age, phone } = req.body;
  db.run('INSERT INTO users (name, age, phone) VALUES (?, ?, ?)', [name, age, phone], function (err) {
    if (err) return res.status(500).send('Error saving');
    res.send({ id: this.lastID });
  });
});

// Get all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) return res.status(500).send('Error fetching');
    res.send(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

dotenv.config();