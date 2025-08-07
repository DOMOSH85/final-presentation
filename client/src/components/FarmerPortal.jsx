import React from 'react';

const FarmerPortal = ({ onLogout }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Farmer Portal</h1>
    <p>Welcome, Farmer! Here you can access your dashboard and resources.</p>
    <button onClick={onLogout} className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
  </div>
);

export default FarmerPortal;
