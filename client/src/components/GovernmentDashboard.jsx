import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GovernmentDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/government/dashboard', {
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
        <h1 className="text-3xl font-bold text-green-800">Government Dashboard</h1>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Farmers</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.farmers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Crops</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.crops || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Schemes</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.schemes || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Market Prices</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.marketPrices || 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/government/farmers')}
            className="p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-left"
          >
            <h3 className="font-semibold text-lg">Manage Farmers</h3>
            <p>View and manage registered farmers</p>
          </button>
          <button 
            onClick={() => navigate('/government/schemes')}
            className="p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-left"
          >
            <h3 className="font-semibold text-lg">Manage Schemes</h3>
            <p>Create and manage government schemes</p>
          </button>
          <button 
            onClick={() => navigate('/government/prices')}
            className="p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-left"
          >
            <h3 className="font-semibold text-lg">Market Prices</h3>
            <p>Set and update market prices</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;