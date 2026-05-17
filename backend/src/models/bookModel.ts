import mongoose, { Schema } from 'mongoose';
import { IBook, BookStatus } from '../types/book.js';

const bookSchema: Schema<IBook> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      default: 'General',
    },
    coverUrl: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(BookStatus),
      default: BookStatus.WANT_TO_READ,
    },
    pagesRead: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPages: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model<IBook>('Book', bookSchema);
