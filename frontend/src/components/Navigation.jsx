import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useSnackbar } from 'notistack';

const Navigation = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    auth.logout();
    enqueueSnackbar('Logged out successfully', { variant: 'success' });
    navigate('/login');
  };

  return (
    <nav className="bg-sky-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={auth.user ? "/books" : "/"} className="text-xl font-bold">
          BookStore
        </Link>
        
        <div className="flex gap-4">
          {auth.user ? (
            <>
              <Link to="/books" className="hover:text-sky-200">
                Home
              </Link>
              <Link to="/books/create" className="hover:text-sky-200">
                Add Book
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-sky-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-sky-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-sky-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;