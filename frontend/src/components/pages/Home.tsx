import React, { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdSearch, MdViewList, MdViewModule } from "react-icons/md";
import BooksTable from "../home/BooksTable";
import BooksCard from "../home/BooksCard";
import type { Book, PaginatedResponse } from "../../types";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showType, setShowType] = useState<"table" | "card">("table");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get<PaginatedResponse<Book>>(`/books/mine`, {
        params: { page, search }
      });
      
      const { books: booksData, pages } = response.data;
      setBooks(booksData || []);
      setTotalPages(pages || 1);
    } catch (error) {
      console.error("Error fetching library books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchBooks]);

  return (
    <div className="max-w-7xl mx-auto pb-12 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            My Library 📚
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Manage your personal collection and tracking
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-grow min-w-[280px] lg:w-80">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl z-10" />
            <input
              type="text"
              placeholder="Search by title or author..."
              className="input-field !pl-12 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                showType === "table" 
                ? "bg-white dark:bg-slate-700 shadow-sm text-sky-600 dark:text-sky-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              }`}
              onClick={() => setShowType("table")}
            >
              <MdViewList className="text-xl" />
              <span className="font-bold text-sm">Table</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                showType === "card" 
                ? "bg-white dark:bg-slate-700 shadow-sm text-sky-600 dark:text-sky-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              }`}
              onClick={() => setShowType("card")}
            >
              <MdViewModule className="text-xl" />
              <span className="font-bold text-sm">Grid</span>
            </button>
          </div>
          
          <Link to="/books/create" className="btn-primary flex items-center gap-2 py-3">
            <MdOutlineAddBox className="text-2xl" />
            <span className="font-bold">Add Book</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      ) : (
        <div className="animate-in fade-in duration-700">
          {books.length > 0 ? (
            <>
              {showType === "table" ? (
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <BooksTable books={books} />
                </div>
              ) : (
                <BooksCard books={books} />
              )}

              <div className="flex justify-center items-center gap-8 mt-16">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  className="btn-secondary py-3 px-8 disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform inline-block mr-2">←</span>
                  Previous
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Page</span>
                  <span className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black shadow-lg shadow-sky-200 dark:shadow-none">
                    {page}
                  </span>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">of {totalPages}</span>
                </div>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  className="btn-secondary py-3 px-8 disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                  Next
                  <span className="group-hover:translate-x-1 transition-transform inline-block ml-2">→</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-32 bg-white dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-6xl mb-6">🏜️</div>
              <p className="text-slate-400 dark:text-slate-500 text-xl font-bold">
                {search ? "No matches found for your search." : "Your library is empty. Start adding some books!"}
              </p>
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="mt-6 text-sky-500 font-black hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
