import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

const FarmerDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/farmer/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setDashboardData(data);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Farmer Dashboard</h1>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Crops</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.crops || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Crops</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.activeCrops || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Available Schemes</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.schemes || 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Latest Market Prices</h2>
        {dashboardData?.latestPrices && dashboardData.latestPrices.length > 0 ? (
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
                {dashboardData.latestPrices.map((price) => (
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/farmer/crops')}
            className="p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-left"
          >
            <h3 className="font-semibold text-lg">Manage Crops</h3>
            <p>Add, view, or update your crops</p>
          </button>
          <button 
            onClick={() => navigate('/farmer/schemes')}
            className="p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-left"
          >
            <h3 className="font-semibold text-lg">View Schemes</h3>
            <p>Check available government schemes</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;