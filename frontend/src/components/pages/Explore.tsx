import React, { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import Spinner from "../Spinner";
import { MdSearch, MdViewList, MdViewModule, MdFilterList } from "react-icons/md";
import BooksTable from "../home/BooksTable";
import BooksCard from "../home/BooksCard";
import type { Book, PaginatedResponse } from "../../types";

const Explore: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showType, setShowType] = useState<"table" | "card">("card");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genre, setGenre] = useState<string>("All");

  const genres: string[] = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Biography", "History", "Mystery", "General"];

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get<PaginatedResponse<Book>>(`/books`, {
        params: {
          page,
          search,
          genre: genre === "All" ? "" : genre
        }
      });
      setBooks(response.data.books || []);
      setTotalPages(response.data.pages || 1);
    } catch (error) {
      console.error("Error exploring books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, genre]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchBooks]);

  return (
    <div className="max-w-7xl mx-auto pb-12 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Explore Books 🌍
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
            Discover gems from the global community
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full md:w-80">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl z-10" />
            <input
              type="text"
              placeholder="Search title/author..."
              className="input-field !pl-12 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <MdFilterList className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10" />
              <select 
                value={genre} 
                onChange={(e) => {
                  setGenre(e.target.value);
                  setPage(1);
                }}
                className="input-field py-3 !pl-12 w-full appearance-none cursor-pointer"
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl shrink-0">
              <button
                className={`p-2.5 rounded-xl transition-all ${
                  showType === "table" ? "bg-white dark:bg-slate-700 shadow-sm text-sky-600 dark:text-sky-400" : "text-slate-500 dark:text-slate-400"
                }`}
                onClick={() => setShowType("table")}
                title="Table View"
              >
                <MdViewList className="text-2xl" />
              </button>
              <button
                className={`p-2.5 rounded-xl transition-all ${
                  showType === "card" ? "bg-white dark:bg-slate-700 shadow-sm text-sky-600 dark:text-sky-400" : "text-slate-500 dark:text-slate-400"
                }`}
                onClick={() => setShowType("card")}
                title="Grid View"
              >
                <MdViewModule className="text-2xl" />
              </button>
            </div>
          </div>
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
                  <BooksTable books={books} isPublic={true} />
                </div>
              ) : (
                <BooksCard books={books} isPublic={true} />
              )}

              <div className="flex justify-center items-center gap-8 mt-16">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  className="btn-secondary py-3 px-8 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Page</span>
                  <span className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black">
                    {page}
                  </span>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">of {totalPages}</span>
                </div>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  className="btn-secondary py-3 px-8 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-32 bg-white dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-6xl mb-6">🔭</div>
              <p className="text-slate-400 dark:text-slate-500 text-xl font-bold">
                No books found. Try adjusting your search or category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
