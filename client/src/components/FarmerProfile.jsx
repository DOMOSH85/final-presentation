import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';

const FarmerProfile = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data: profile, loading, error, refetch } = useApi('/api/farmer/profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Update form data when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email
      });
    }
  }, [profile]);

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
      const res = await fetch('/api/farmer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        refetch(); // Refresh the profile data
        setEditMode(false);
      } else {
        console.error('Failed to update profile:', data.message);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
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
        <h1 className="text-3xl font-bold text-green-800">My Profile</h1>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Profile Information</h2>
          {!editMode && (
            <button 
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {editMode ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <p className="px-3 py-2 border rounded bg-gray-50">{profile?.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <p className="px-3 py-2 border rounded bg-gray-50">{profile?.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Role</label>
              <p className="px-3 py-2 border rounded bg-gray-50">{profile?.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;