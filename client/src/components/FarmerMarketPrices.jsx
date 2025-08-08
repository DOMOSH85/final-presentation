import React from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';

const FarmerMarketPrices = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data: prices, loading, error } = useApi('/api/farmer/prices');

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xl">Loading market prices...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Market Prices</h1>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Current Market Prices</h2>
        {prices && prices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prices.map((price) => (
                  <tr key={price._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{price.cropName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">KSh {price.price}/{price.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{price.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(price.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No market prices available</p>
        )}
      </div>
    </div>
  );
};

export default FarmerMarketPrices;