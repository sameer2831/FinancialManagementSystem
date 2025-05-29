import { useState } from 'react';
import api from '../services/api';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/reset-password', {
        token,
        newPassword,
      });
      setMessage(res.data.message || 'Password reset successfully!');
    } catch (err) {
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="text"
          placeholder="Enter reset token"
          className="w-full border p-2 rounded"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
          Reset Password
        </button>
        {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
