// server/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// CREATE - Add new book
router.post('/', auth, async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
      createdBy: req.userId
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Get all books with filters
router.get('/', auth, async (req, res) => {
  try {
    const { genre, author, search, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (genre) query.genre = genre;
    if (author) query.author = new RegExp(author, 'i');
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { author: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    
    const books = await Book.find(query)
      .populate('createdBy', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Book.countDocuments(query);
    
    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalBooks: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get single book
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'name email');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Update book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found or unauthorized' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found or unauthorized' });
    }
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;