import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';

const GovernmentSchemes = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data: schemes, loading, error, refetch } = useApi('/api/government/schemes');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eligibility: '',
    benefits: '',
    applicationProcess: '',
    deadline: ''
  });

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
      const res = await fetch('/api/government/schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        refetch(); // Refresh the schemes list
        setFormData({
          title: '',
          description: '',
          eligibility: '',
          benefits: '',
          applicationProcess: '',
          deadline: ''
        });
        setShowAddForm(false);
      } else {
        console.error('Failed to add scheme:', data.message);
      }
    } catch (err) {
      console.error('Error adding scheme:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/government/schemes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        refetch(); // Refresh the schemes list
      } else {
        const data = await res.json();
        console.error('Failed to delete scheme:', data.message);
      }
    } catch (err) {
      console.error('Error deleting scheme:', err);
    }
  };

  const toggleSchemeStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/government/schemes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      const data = await res.json();
      if (res.ok) {
        refetch(); // Refresh the schemes list
      } else {
        console.error('Failed to update scheme status:', data.message);
      }
    } catch (err) {
      console.error('Error updating scheme status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xl">Loading schemes...</div>
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
        <h1 className="text-3xl font-bold text-green-800">Government Schemes</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {showAddForm ? 'Cancel' : 'Add Scheme'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Scheme</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Eligibility</label>
              <textarea
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                rows="2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Benefits</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                rows="2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Application Process</label>
              <textarea
                name="applicationProcess"
                value={formData.applicationProcess}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                rows="2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Deadline (optional)</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Add Scheme
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Schemes</h2>
        {schemes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schemes.map((scheme) => (
                  <tr key={scheme._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{scheme.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        scheme.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {scheme.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {scheme.deadline ? new Date(scheme.deadline).toLocaleDateString() : 'No deadline'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleSchemeStatus(scheme._id, scheme.isActive)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        {scheme.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(scheme._id)}
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
          <p>No schemes available</p>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;