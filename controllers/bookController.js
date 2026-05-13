const bookModel = require('../models/bookModel');

const getBooks = async (req, res) => {
  try {
    const books = await bookModel.getAll(req.user.id);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const book = await bookModel.create({
      title,
      author: author || '',
      genre: genre || '',
      publicationDate: publicationDate || null,
      readStatus: 'unread',
      userId: req.user.id,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const existing = await bookModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Book not found' });
    if (existing.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const updated = await bookModel.update(req.params.id, { ...existing, ...req.body, userId: req.user.id });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const existing = await bookModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Book not found' });
    if (existing.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await bookModel.remove(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getBooks, createBook, updateBook, deleteBook };
