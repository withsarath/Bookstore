import React, { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import { useParams } from "react-router-dom";
import BackButton from "../BackButton";
import Spinner from "../Spinner";
import { BiTimeFive, BiHash, BiCalendar, BiUser } from "react-icons/bi";
import { MdOutlineRateReview, MdStar } from "react-icons/md";
import type { Book, Review } from "../../types";

const ShowBook: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [bookRes, reviewsRes] = await Promise.all([
        API.get<Book>(`/books/${id}`),
        API.get<Review[]>(`/books/${id}/reviews`)
      ]);
      setBook(bookRes.data);
      setReviews(reviewsRes.data || []);
    } catch (err) {
      console.error("Error fetching book details:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post(`/books/${id}/reviews`, { rating, comment });
      fetchData();
      setComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-24">
      <Spinner />
    </div>
  );
  
  if (!book) return (
    <div className="max-w-4xl mx-auto p-12 text-center">
      <BackButton />
      <div className="bg-white dark:bg-slate-800 p-12 rounded-[2rem] shadow-xl">
        <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold">Book not found 🔍</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 animate-in fade-in duration-700">
      <BackButton />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Book Details */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 sticky top-32">
            <div className="aspect-[2/3] w-full rounded-2xl bg-slate-50 dark:bg-slate-900 mb-8 overflow-hidden shadow-inner">
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                  <BiHash className="text-8xl" />
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight">{book.title}</h1>
            <p className="text-sky-600 dark:text-sky-400 font-bold text-xl mb-8 flex items-center gap-2">
              <BiUser className="text-2xl" />
              {book.author}
            </p>

            <div className="space-y-6">
              <DetailItem icon={<BiHash />} label="Genre" value={book.genre || 'General'} />
              <DetailItem icon={<BiCalendar />} label="Published" value={book.publishYear.toString()} />
              <DetailItem 
                icon={<MdStar className="text-amber-500" />} 
                label="Rating" 
                value={`${book.rating?.toFixed(1) || 0} / 5.0 (${book.numReviews} reviews)`} 
              />
              <DetailItem 
                icon={<BiTimeFive />} 
                label="Added" 
                value={new Date(book.createdAt).toLocaleDateString()} 
              />
            </div>
          </div>
        </div>

        {/* Right Column: Reviews */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4">
              <MdOutlineRateReview className="text-sky-500" />
              Reader Reviews
            </h2>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl mb-16 border border-slate-100 dark:border-slate-700/50">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-8">Write a Review ✍️</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="md:col-span-1">
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Rating</label>
                  <select 
                    value={rating} 
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="input-field py-3 font-bold"
                  >
                    {[5,4,3,2,1].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Your Thoughts</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input-field"
                    rows={2}
                    placeholder="What did you think of this book?"
                    required
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full md:w-auto py-4 px-12">
                Post Review
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-12">
              {reviews.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                  <p className="text-slate-400 dark:text-slate-500 text-lg font-medium italic">No reviews yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="animate-in fade-in slide-in-from-top-4 duration-500 pb-12 border-b last:border-0 border-slate-100 dark:border-slate-700/50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400 font-black text-lg">
                          {review.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-slate-100">{review.name}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-amber-400 text-xl">
                        {[...Array(5)].map((_, i) => (
                          <MdStar key={i} className={i < review.rating ? "text-amber-400" : "text-slate-200 dark:text-slate-700"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg pl-16">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-5 text-slate-600 dark:text-slate-400 group">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-2xl text-slate-400 dark:text-slate-600 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20 group-hover:text-sky-500 transition-all">
      {icon}
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-0.5">{label}</p>
      <p className="font-bold text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  </div>
);

export default ShowBook;
