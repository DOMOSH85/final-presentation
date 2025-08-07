import React from 'react';

const GovernmentPortal = ({ onLogout }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Government Portal</h1>
    <p>Welcome, Government Officer! Here you can manage farmer data and resources.</p>
    <button onClick={onLogout} className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
  </div>
);

export default GovernmentPortal;
