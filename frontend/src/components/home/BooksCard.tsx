import React from 'react';
import BookSingleCard from './BookSingleCard';
import type { Book } from '../../types';

interface BooksCardProps {
  books: Book[];
  isPublic?: boolean;
}

const BooksCard: React.FC<BooksCardProps> = ({ books, isPublic = false }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} isPublic={isPublic} />
      ))}
    </div>
  );
};

export default BooksCard;
