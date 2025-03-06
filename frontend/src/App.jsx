import './index.css'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import CreateBooks from "./components/pages/CreateBooks";
import ShowBook from "./components/pages/ShowBook";
import EditBook from "./components/pages/EditBook";
import DeleteBook from "./components/pages/DeleteBook";
import Home from './components/pages/Home';
import Register from "./components/pages/Register"; 
import Login from "./components/pages/Login";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4">
        <Routes>
          {/* Redirect root to books if authenticated, otherwise to login */}
          <Route 
            path="/" 
            element={
              localStorage.getItem('token') 
                ? <Navigate to="/books" replace /> 
                : <Navigate to="/login" replace />
            } 
          />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
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
        </Routes>
      </div>
    </div>
  );
};

export default App;
