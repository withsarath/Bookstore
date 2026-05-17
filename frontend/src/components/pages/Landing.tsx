import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { BiLibrary, BiShieldQuarter, BiStar } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import Spinner from '../Spinner';
import BookSingleCard from '../home/BookSingleCard';
import type { Book, PaginatedResponse } from '../../types';

const Landing = () => {
  const { user } = useAuth();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const response = await API.get<PaginatedResponse<Book>>('/books?limit=4');
        setFeaturedBooks(response.data.books || []);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-5xl px-6 pt-20 pb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="inline-block px-6 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-10 shadow-sm">
          Welcome to the Future of Reading
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[0.9]">
          Your Personal <br />
          <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent italic">Digital Library</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
          The modern way to organize, review, and share your book collection. Join thousands of readers managing their libraries with absolute ease.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {user ? (
            <Link to="/books" className="btn-primary py-5 px-12 text-xl font-black rounded-[1.5rem]">
              Go to My Library
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary py-5 px-12 text-xl font-black rounded-[1.5rem]">
                Get Started for Free
              </Link>
              <Link to="/login" className="btn-secondary py-5 px-12 text-xl font-black rounded-[1.5rem]">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 dark:border-slate-800">
        <FeatureCard 
          icon={<BiLibrary />} 
          title="Smart Catalog" 
          desc="Keep track of every book you've read or want to read with our intuitive management system." 
        />
        <FeatureCard 
          icon={<BiStar className="text-amber-500" />} 
          title="Ratings & Reviews" 
          desc="Write detailed reviews and rate your favorites. Share your insights with the community." 
          color="amber"
        />
        <FeatureCard 
          icon={<BiShieldQuarter className="text-indigo-600" />} 
          title="Secure & Private" 
          desc="Your data is protected with industry-standard encryption. You control who sees your collection." 
          color="indigo"
        />
      </div>

      {/* Featured Books Section */}
      <div className="w-full bg-slate-50 dark:bg-slate-900/50 py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Featured Books 🌟</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-xl leading-relaxed">See what our community is reading right now</p>
            </div>
            <Link to="/explore" className="text-sky-600 dark:text-sky-400 font-black text-lg hover:underline mb-2 transition-all">
              View All Books →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner /></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredBooks.map((book) => (
                <BookSingleCard key={book._id} book={book} isPublic={true} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="container mx-auto px-6 py-32">
        <div className="w-full bg-slate-900 dark:bg-sky-950 p-16 md:p-24 rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Ready to start your journey?</h2>
            <p className="text-sky-200/60 text-xl mb-12 font-medium">No credit card required. Join 5,000+ readers today.</p>
            <Link to="/register" className="btn-primary bg-white text-slate-900 hover:bg-sky-50 py-5 px-16 text-xl font-black rounded-2xl inline-block shadow-none">
              Create My Account
            </Link>
          </div>
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-16 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em] text-xs">
          &copy; {new Date().getFullYear()} OpenShelf &bull; Digital Library Management
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color = 'sky' }: { icon: React.ReactNode, title: string, desc: string, color?: 'sky' | 'amber' | 'indigo' }) => {
  const colorMap = {
    sky: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 card-hover group">
      <div className={`w-20 h-20 ${colorMap[color]} rounded-3xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-5">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default Landing;
