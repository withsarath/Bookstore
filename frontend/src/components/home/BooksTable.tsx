import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import type { Book } from "../../types";

interface BooksTableProps {
  books: Book[];
  isPublic?: boolean;
}

const BooksTable: React.FC<BooksTableProps> = ({ books, isPublic = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">No</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Title</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] max-md:hidden">Author</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] max-md:hidden">Genre</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] max-md:hidden">Year</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group">
              <td className="px-6 py-4 text-slate-400 dark:text-slate-600 font-bold text-sm">{index + 1}</td>
              <td className="px-6 py-4">
                <div className="font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{book.title}</div>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-md:hidden font-medium">{book.author}</td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-500 max-md:hidden italic text-sm">{book.genre || 'General'}</td>
              <td className="px-6 py-4 max-md:hidden">
                <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {book.publishYear}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <Link 
                    to={`/books/details/${book._id}`}
                    className="p-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-600 dark:hover:bg-green-600 hover:text-white transition-all shadow-sm"
                    title="View Details"
                  >
                    <BsInfoCircle className="text-lg" />
                  </Link>
                  {!isPublic && (
                    <>
                      <Link 
                        to={`/books/edit/${book._id}`}
                        className="p-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl hover:bg-amber-600 dark:hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                        title="Edit Book"
                      >
                        <AiOutlineEdit className="text-lg" />
                      </Link>
                      <Link 
                        to={`/books/delete/${book._id}`}
                        className="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Delete Book"
                      >
                        <MdOutlineDelete className="text-lg" />
                      </Link>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
