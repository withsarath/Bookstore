import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for saving a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: 'All fields are required: title, author, publishYear' });
        }
        const book = await Book.create({ title, author, publishYear });
        return res.status(201).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for fetching all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({ count: books.length, data: books });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for fetching a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for updating a book by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: 'All fields are required: title, author, publishYear' });
        }
        const book = await Book.findByIdAndUpdate(id, { title, author, publishYear }, { new: true });
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for deleting a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
