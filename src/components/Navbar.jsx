import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, User, LogIn } from 'lucide-react';
import { authService } from '../api'; // Adjust the path based on your file structure

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout(); // Clear token and user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8" />
            <span className="text-xl font-bold">AgriShop</span>
          </Link>

          <div className="flex space-x-6">
            <Link to="/crops" className="hover:text-green-200 transition-colors">
              Browse Crops
            </Link>
            <Link to="/create-crop" className="hover:text-green-200 transition-colors">
              Sell Crops
            </Link>
          </div>

          {token ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-1 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="flex items-center space-x-1 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
