import { Book } from '../models/bookModel.js';
import axios from 'axios';
import { Types } from 'mongoose';
import { BookStatus, IBook } from '../types/book.js';

interface FetchBookMetadata {
  coverUrl?: string;
  totalPages?: number;
}

const fetchMetadata = async (title: string, author: string): Promise<FetchBookMetadata> => {
  try {
    const query = `intitle:${title}+inauthor:${author}`;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`);
    
    if (response.data.items && response.data.items.length > 0) {
      const volumeInfo = response.data.items[0].volumeInfo;
      return {
        coverUrl: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:'),
        totalPages: volumeInfo.pageCount || 0
      };
    }
  } catch (error) {
    console.error('Error fetching book metadata:', error);
  }
  return {};
};

export const createBook = async (bookData: Partial<IBook>, userId: Types.ObjectId): Promise<IBook> => {
  const { title, author, publishYear, genre } = bookData;
  
  if (!title || !author) {
    throw new Error('Title and Author are required');
  }

  const metadata = await fetchMetadata(title, author);

  return await Book.create({
    title,
    author,
    publishYear,
    genre: genre || 'General',
    user: userId,
    coverUrl: bookData.coverUrl || metadata.coverUrl,
    totalPages: bookData.totalPages || metadata.totalPages || 0,
    pagesRead: 0,
    status: BookStatus.WANT_TO_READ
  });
};

export const getAllBooks = async (queryParams: any) => {
  const { page = 1, limit = 10, search = '', genre = '', userId = null } = queryParams;
  const skip = (page - 1) * limit;

  const query: any = {};

  if (userId) {
    query.user = userId;
  }

  if (genre) {
    query.genre = genre;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
    ];
  }

  const books = await Book.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Book.countDocuments(query);

  return {
    books,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

export const getBookById = async (id: string): Promise<IBook | null> => {
  return await Book.findById(id);
};

export const updateBook = async (id: string, bookData: Partial<IBook>, userId: Types.ObjectId): Promise<IBook | null> => {
  const book = await Book.findById(id);

  if (!book) {
    const error: any = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  if (book.user.toString() !== userId.toString()) {
    const error: any = new Error('Not authorized to update this book');
    error.statusCode = 401;
    throw error;
  }

  // Update status based on pages read if not provided
  if (bookData.pagesRead !== undefined) {
    if (bookData.pagesRead >= (bookData.totalPages || book.totalPages) && book.totalPages > 0) {
      bookData.status = BookStatus.COMPLETED;
    } else if (bookData.pagesRead > 0) {
      bookData.status = BookStatus.READING;
    }
  }

  return await Book.findByIdAndUpdate(id, bookData, { new: true });
};

export const deleteBook = async (id: string, userId: Types.ObjectId): Promise<IBook | null> => {
  const book = await Book.findById(id);

  if (!book) {
    const error: any = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  if (book.user.toString() !== userId.toString()) {
    const error: any = new Error('Not authorized to delete this book');
    error.statusCode = 401;
    throw error;
  }

  return await Book.findByIdAndDelete(id);
};

export const getStats = async (userId: Types.ObjectId) => {
  const books = await Book.find({ user: userId });
  
  const stats = {
    totalBooks: books.length,
    completedBooks: books.filter(b => b.status === BookStatus.COMPLETED).length,
    readingBooks: books.filter(b => b.status === BookStatus.READING).length,
    wantToReadBooks: books.filter(b => b.status === BookStatus.WANT_TO_READ).length,
    totalPagesRead: books.reduce((acc, b) => acc + b.pagesRead, 0),
    genreDistribution: books.reduce((acc: any, b) => {
      acc[b.genre] = (acc[b.genre] || 0) + 1;
      return acc;
    }, {})
  };

  return stats;
};
