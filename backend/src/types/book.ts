import { Document, Types } from 'mongoose';

export enum BookStatus {
  WANT_TO_READ = 'Want to Read',
  READING = 'Reading',
  COMPLETED = 'Completed'
}

export interface IBook extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  author: string;
  publishYear: number;
  genre: string;
  coverUrl?: string;
  status: BookStatus;
  pagesRead: number;
  totalPages: number;
  rating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}
