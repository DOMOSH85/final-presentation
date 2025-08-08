import React from 'react';
import useApi from '../hooks/useApi';

const FarmerSchemes = () => {
  const { data: schemes, loading, error } = useApi('/api/farmer/schemes');

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
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Available Schemes</h2>
        {schemes && schemes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {schemes.map((scheme) => (
              <div key={scheme._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">{scheme.title}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      scheme.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {scheme.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {scheme.deadline && (
                    <div className="text-sm text-gray-500">
                      Deadline: {new Date(scheme.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <p className="mt-4 text-gray-700">{scheme.description}</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700">Eligibility</h4>
                    <p className="text-gray-700">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700">Benefits</h4>
                    <p className="text-gray-700">{scheme.benefits}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-green-700">Application Process</h4>
                  <p className="text-gray-700">{scheme.applicationProcess}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No schemes available at the moment</p>
        )}
      </div>
    </div>
  );
};

export default FarmerSchemes;