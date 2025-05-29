import { useState } from 'react';
import api from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Failed to send reset link');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
          Send Reset Token
        </button>
        {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
