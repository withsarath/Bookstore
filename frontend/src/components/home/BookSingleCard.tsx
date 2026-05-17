import React from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import type { Book } from '../../types';

interface BookSingleCardProps {
  book: Book;
  isPublic?: boolean;
}

const BookSingleCard: React.FC<BookSingleCardProps> = ({ book, isPublic = false }) => {
  const progress = book.totalPages > 0 ? (book.pagesRead / book.totalPages) * 100 : 0;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 relative card-hover group flex flex-col h-full shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit">
            {book.publishYear}
          </span>
          <span className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit">
            {book.genre || 'General'}
          </span>
        </div>
        <span className="text-slate-200 dark:text-slate-700 group-hover:text-sky-500 transition-colors">
          <PiBookOpenTextLight className="text-4xl" />
        </span>
      </div>

      <div className="mb-6 aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-inner relative">
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200 dark:text-slate-800">
            <PiBookOpenTextLight className="text-7xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="space-y-3 mb-8">
        <h2 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {book.title}
        </h2>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <BiUserCircle className="text-2xl text-slate-300 dark:text-slate-600" />
          <span className="font-bold text-sm tracking-tight">{book.author}</span>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
            <span>Progress</span>
            <span>{book.pagesRead} / {book.totalPages} pages</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(14,165,233,0.3)]"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-700/50">
          <Link
            to={`/books/details/${book._id}`}
            className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-2xl hover:bg-sky-500 dark:hover:bg-sky-600 hover:text-white dark:hover:text-white transition-all shadow-sm group/btn"
            title="Quick View"
          >
            <BiShow className="text-2xl" />
          </Link>
          
          {!isPublic && (
            <div className="flex gap-2">
              <Link
                to={`/books/edit/${book._id}`}
                className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-2xl hover:bg-amber-500 dark:hover:bg-amber-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
                title="Edit"
              >
                <AiOutlineEdit className="text-2xl" />
              </Link>
              <Link
                to={`/books/delete/${book._id}`}
                className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-2xl hover:bg-red-500 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
                title="Delete"
              >
                <MdOutlineDelete className="text-2xl" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSingleCard;
