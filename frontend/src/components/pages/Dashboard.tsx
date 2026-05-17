import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import Spinner from '../Spinner';
import type { UserStats } from '../../types';
import { BiBookContent, BiCheckCircle, BiTimeFive, BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineAutoGraph } from 'react-icons/md';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get<UserStats>('/books/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center py-24"><Spinner /></div>;
  
  if (!stats) return (
    <div className="max-w-4xl mx-auto py-24 text-center px-6">
      <div className="bg-white dark:bg-slate-800 p-16 rounded-[3rem] shadow-xl">
        <div className="text-6xl mb-8 text-slate-300">📊</div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">No Data Available</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Add some books to your library to see your reading analytics!</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 animate-in fade-in duration-1000">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Reading Analytics 📊</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-xl">Track your progress and library distribution</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatCard 
          icon={<BiBookContent />} 
          label="Total Books" 
          value={stats.totalBooks} 
          color="sky" 
        />
        <StatCard 
          icon={<BiCheckCircle />} 
          label="Completed" 
          value={stats.completedBooks} 
          color="green" 
        />
        <StatCard 
          icon={<BiTimeFive />} 
          label="Reading Now" 
          value={stats.readingBooks} 
          color="amber" 
        />
        <StatCard 
          icon={<MdOutlineAutoGraph />} 
          label="Pages Read" 
          value={stats.totalPagesRead} 
          color="indigo" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Genre Distribution */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <BiCategoryAlt className="text-xl" />
            </div>
            Genre Distribution
          </h2>
          <div className="space-y-8">
            {Object.entries(stats.genreDistribution).length > 0 ? (
              Object.entries(stats.genreDistribution).map(([genre, count]) => {
                const percentage = (count / stats.totalBooks) * 100;
                return (
                  <div key={genre} className="group">
                    <div className="flex justify-between items-end mb-3 px-1">
                      <span className="font-bold text-slate-700 dark:text-slate-200">{genre}</span>
                      <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{count} {count === 1 ? 'Book' : 'Books'}</span>
                    </div>
                    <div className="h-3 bg-slate-50 dark:bg-slate-900 rounded-full overflow-hidden p-[2px]">
                      <div 
                        className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center py-10 text-slate-400 italic">No genre data available.</p>
            )}
          </div>
        </div>

        {/* Motivation Card */}
        <div className="lg:col-span-7 bg-slate-900 dark:bg-slate-950 p-12 md:p-16 rounded-[3.5rem] text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="inline-block px-4 py-1 bg-sky-500/20 text-sky-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Keep reading
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">Your story is <br />unfolding! 🚀</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-md font-medium leading-relaxed">
              You've conquered <span className="text-sky-400 font-black">{stats.totalPagesRead}</span> pages across your collection. Every page turned is a new perspective gained.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="bg-white/5 px-8 py-5 rounded-3xl backdrop-blur-xl border border-white/5 flex flex-col items-center min-w-[140px]">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Consistency</p>
                <p className="text-2xl font-black text-white">Daily</p>
              </div>
              <div className="bg-white/5 px-8 py-5 rounded-3xl backdrop-blur-xl border border-white/5 flex flex-col items-center min-w-[140px]">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Reading Rank</p>
                <p className="text-2xl font-black text-sky-400">Elite</p>
              </div>
            </div>
          </div>
          {/* Abstract decoration */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute right-10 top-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'sky' | 'green' | 'amber' | 'indigo';
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  const colorMap = {
    sky: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 card-hover group">
      <div className={`w-14 h-14 ${colorMap[color]} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3 ml-1">{label}</p>
      <p className="text-5xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{value}</p>
    </div>
  );
};

export default Dashboard;
