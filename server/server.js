require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/books');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookhub';

connectDB(MONGO_URI);

app.use(cors());
app.use(express.json());

// Simple root
app.get('/', (req, res) => res.send('BookHub API is running'));

// API routes
app.use('/api/books', booksRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
