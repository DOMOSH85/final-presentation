import { useState, useEffect } from 'react';

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const token = localStorage.getItem('token');
      if (token) {
        defaultOptions.headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        // Handle validation errors
        if (responseData.errors) {
          const errorMessages = responseData.errors.map(err => err.msg).join(', ');
          throw new Error(errorMessages || 'Validation error');
        }
        throw new Error(responseData.message || 'An error occurred');
      }
      
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useApi;