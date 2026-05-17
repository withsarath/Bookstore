export enum BookStatus {
  WANT_TO_READ = 'Want to Read',
  READING = 'Reading',
  COMPLETED = 'Completed'
}

export type User ={
  _id: string;
  name: string;
  username: string;
  email: string;
  token: string;
}

export interface Book {
  _id: string;
  user: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: string;
  book: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  books: T[];
  total: number;
  page: number;
  pages: number;
}

export interface UserStats {
  totalBooks: number;
  completedBooks: number;
  readingBooks: number;
  wantToReadBooks: number;
  totalPagesRead: number;
  genreDistribution: Record<string, number>;
}
