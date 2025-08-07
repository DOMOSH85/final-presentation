import React, { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const SignInModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sign in failed');
      // Save token and user info
      localStorage.setItem('user', JSON.stringify(data));
      setTimeout(() => {
        onClose();
        if (data.role === 'farmer') {
          navigate('/farmer-portal');
        } else if (data.role === 'government') {
          navigate('/government-portal');
        }
      }, 500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700" />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button type="submit" className="w-full py-2 bg-green-800 text-white rounded hover:bg-green-700 transition">Sign In</button>
      </form>
    </Modal>
  );
};

export default SignInModal;
