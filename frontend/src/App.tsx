import './index.css'
import './App.css'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import CreateBooks from "./components/pages/CreateBooks";
import ShowBook from "./components/pages/ShowBook";
import EditBook from "./components/pages/EditBook";
import DeleteBook from "./components/pages/DeleteBook";
import Home from './components/pages/Home';
import Register from "./components/pages/Register"; 
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Landing from "./components/pages/Landing";
import Explore from "./components/pages/Explore";
import Dashboard from "./components/pages/Dashboard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navigation />
      <div className="container mx-auto px-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books/create" 
            element={
              <ProtectedRoute>
                <CreateBooks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books/details/:id" 
            element={
              <ProtectedRoute>
                <ShowBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books/edit/:id" 
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books/delete/:id" 
            element={
              <ProtectedRoute>
                <DeleteBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
