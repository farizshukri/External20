// backend/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        const book = new Book({ title, author, year, genre });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
