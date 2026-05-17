import { Request, Response } from 'express';
import * as bookService from '../services/bookService.js';

export const createBook = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    const book = await bookService.createBook(req.body, req.user._id);
    res.status(201).json(book);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, genre } = req.query;
    const result = await bookService.getAllBooks({ page, limit, search, genre });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBooks = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    const { page, limit, search, genre } = req.query;
    const result = await bookService.getAllBooks({ 
      page, 
      limit, 
      search, 
      genre, 
      userId: req.user._id 
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    const book = await bookService.updateBook(req.params.id, req.body, req.user._id);
    res.json(book);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    await bookService.deleteBook(req.params.id, req.user._id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    const stats = await bookService.getStats(req.user._id);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
