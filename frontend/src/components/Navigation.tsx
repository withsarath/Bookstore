import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { useSnackbar } from 'notistack';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    logout();
    enqueueSnackbar('Logged out successfully', { variant: 'success' });
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    const base = "font-medium transition-all duration-300 relative py-1 ";
    const active = "text-sky-600 dark:text-sky-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-500 after:rounded-full";
    const inactive = "text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400";
    return base + (isActive(path) ? active : inactive);
  };

  return (
    <nav className="sticky top-0 z-50 glass-morphism mb-8">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform group-hover:scale-110">📖</span>
          <span className="text-2xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-sky-500 group-hover:to-indigo-500 transition-all">
            OpenShelf
          </span>
        </Link>
        
        <div className="flex gap-4 md:gap-8 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MdDarkMode className="text-xl" /> : <MdLightMode className="text-xl" />}
          </button>

          <Link to="/explore" className={linkClass('/explore')}>
            Explore
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className={linkClass('/dashboard') + " hidden md:inline"}>
                Dashboard
              </Link>
              <Link to="/books" className={linkClass('/books')}>
                Library
              </Link>
              <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 md:mx-2"></div>
              <Link to="/profile" className={`flex items-center gap-2 font-semibold transition-all ${isActive('/profile') ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-200 hover:text-sky-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${isActive('/profile') ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 dark:shadow-none' : 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400'}`}>
                  {user.name?.[0].toUpperCase() || 'U'}
                </div>
                <span className="hidden md:inline">{user.name || 'User'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass('/login')}>
                Login
              </Link>
              <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
