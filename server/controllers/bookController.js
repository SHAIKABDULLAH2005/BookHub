const Book = require('../models/Book');

// GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/books
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, publishedDate, coverImage } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const book = new Book({ title, author, description, publishedDate, coverImage });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const { title, author, description, publishedDate, coverImage } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, publishedDate, coverImage },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
