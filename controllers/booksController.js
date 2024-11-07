// controllers/booksController.js
let books = require('../models/books'); // Kitoblar modeli
const { v4: uuidv4 } = require('uuid'); // UUID uchun

exports.getBooks = (req, res) => {
  res.json({ books });
};

exports.getBookById = (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ book });
};

exports.createBook = (req, res) => {
  const { title, pages, author } = req.body;

  // Yangi kitob obyektini yaratish
  const newBook = { id: uuidv4(), title, pages, author };
  books.push(newBook);

  res.status(201).json({ status: 'Created', book: newBook });
};

exports.updateBook = (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  // Yangi ma'lumotlarni yangilash
  const { title, pages, author } = req.body;
  book.title = title || book.title;
  book.pages = pages || book.pages;
  book.author = author || book.author;

  res.json({ status: 'Updated', book });
};

exports.deleteBook = (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(bookIndex, 1); // Kitobni o'chirish
  res.json({ status: 'Deleted' });
};