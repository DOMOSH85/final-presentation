import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../contexts/AuthContext';

const SignUpModal = ({ open, onClose }) => {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    const result = await signUp(name, email, password, role);
    if (result.success) {
      setSuccess('Account created successfully!');
      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setRole('farmer');
      // Close modal after a delay
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1500);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700" />
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700">
          <option value="farmer">Farmer</option>
          <option value="government">Government</option>
        </select>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button type="submit" className="w-full py-2 bg-green-800 text-white rounded hover:bg-green-700 transition">Sign Up</button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
