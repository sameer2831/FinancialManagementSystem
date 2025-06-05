import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // inside component

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', credentials);
      const { token } = response.data;
      console.log('Login response:', response.data);


      // Save token and username
      localStorage.setItem('token', token);
      localStorage.setItem('username', credentials.username); 

      setError('');
      navigate('/user-dashboard'); // Redirect after successful login
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-6">WealthMitra</h2>
        <p className="text-center text-gray-600 mb-6">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-right text-sm mt-1">
          <Link to="/forgot-password" className="text-emerald-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-emerald-600 hover:underline font-medium">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
