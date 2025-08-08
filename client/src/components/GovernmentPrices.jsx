import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';

const GovernmentPrices = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data: prices, loading, error, refetch } = useApi('/api/government/prices');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    price: '',
    unit: 'kg',
    location: ''
  });

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/government/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        refetch(); // Refresh the prices list
        setFormData({
          cropName: '',
          price: '',
          unit: 'kg',
          location: ''
        });
        setShowAddForm(false);
      } else {
        console.error('Failed to add price:', data.message);
      }
    } catch (err) {
      console.error('Error adding price:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/government/prices/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        refetch(); // Refresh the prices list
      } else {
        const data = await res.json();
        console.error('Failed to delete price:', data.message);
      }
    } catch (err) {
      console.error('Error deleting price:', err);
    }
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
        <h1 className="text-3xl font-bold text-green-800">Market Prices Management</h1>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Market Prices</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {showAddForm ? 'Cancel' : 'Add Price'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Price</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Crop Name</label>
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="bunch">bunch</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Add Price
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Market Prices</h2>
        {prices && prices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prices.map((price) => (
                  <tr key={price._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{price.cropName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">KSh {price.price}/{price.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{price.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(price.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(price._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
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

export default GovernmentPrices;