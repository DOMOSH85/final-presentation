import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ onSignIn, onSignUp }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handlePortalNavigation = () => {
    if (user) {
      if (user.role === 'farmer') {
        navigate('/farmer');
      } else if (user.role === 'government') {
        navigate('/government');
      }
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-green-800 text-white">
      <div className="font-bold text-2xl">Sustainable Land</div>
      <div>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.name}</span>
            <button
              onClick={handlePortalNavigation}
              className="mr-4 px-4 py-2 bg-white text-green-800 rounded hover:bg-green-100 transition"
            >
              {user.role === 'farmer' ? 'Farmer Portal' : 'Government Portal'}
            </button>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-100 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <button onClick={onSignIn} className="mr-4 px-4 py-2 bg-white text-green-800 rounded hover:bg-green-100 transition">Sign In</button>
            <button onClick={onSignUp} className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-100 transition">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
