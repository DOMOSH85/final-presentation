import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GovernmentDashboard from './GovernmentDashboard';
import GovernmentSchemes from './GovernmentSchemes';
import GovernmentPrices from './GovernmentPrices';
import GovernmentProfile from './GovernmentProfile';

const GovernmentPortal = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Portal Header */}
      <header className="bg-green-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white text-green-800 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6V4m6 6v4m0 4v2m0-6v2m0 4h4.857M12 18.5V21m-6-2.5h12a3 3 0 013 3v2H3v-2a3 3 0 013-3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Government Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Welcome, {user?.name}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Portal Navigation */}
      <nav className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              to="/government"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              Dashboard
            </Link>
            <Link
              to="/government/schemes"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              Schemes
            </Link>
            <Link
              to="/government/prices"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              Market Prices
            </Link>
            <Link
              to="/government/profile"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              My Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Portal Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<GovernmentDashboard />} />
          <Route path="/dashboard" element={<GovernmentDashboard />} />
          <Route path="/schemes" element={<GovernmentSchemes />} />
          <Route path="/prices" element={<GovernmentPrices />} />
          <Route path="/profile" element={<GovernmentProfile />} />
        </Routes>
      </main>

      {/* Portal Footer */}
      <footer className="bg-green-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2023 Government Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GovernmentPortal;
