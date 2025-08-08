import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FarmerDashboard from './FarmerDashboard';
import FarmerCrops from './FarmerCrops';
import FarmerSchemes from './FarmerSchemes';
import FarmerMarketPrices from './FarmerMarketPrices';
import FarmerProfile from './FarmerProfile';

const FarmerPortal = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Farmer Portal</h1>
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
              to="/farmer"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              Dashboard
            </Link>
            <Link
              to="/farmer/crops"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              My Crops
            </Link>
            <Link
              to="/farmer/schemes"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              Government Schemes
            </Link>
            <Link
              to="/farmer/prices"
              className="py-3 px-1 border-b-2 border-transparent hover:border-white transition"
            >
              Market Prices
            </Link>
            <Link
              to="/farmer/profile"
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
          <Route path="/" element={<FarmerDashboard />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/crops" element={<FarmerCrops />} />
          <Route path="/schemes" element={<FarmerSchemes />} />
          <Route path="/prices" element={<FarmerMarketPrices />} />
          <Route path="/profile" element={<FarmerProfile />} />
        </Routes>
      </main>

      {/* Portal Footer */}
      <footer className="bg-green-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2023 Farmer Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FarmerPortal;
