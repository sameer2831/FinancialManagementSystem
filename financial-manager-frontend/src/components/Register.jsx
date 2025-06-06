import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
//import logo from '../assets/goldlogo.png'
import logo from '../assets/logoWM.png'

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    passwordHash: '',
    email: '',
    role: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/register', {
        FullName: form.fullName,
        Username: form.username,
        PasswordHash: form.passwordHash,
        email: form.email,
        Role: form.role
      });
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 text-gray-900">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Side - Branding/Image */}
        <div className="w-1/2 bg-gradient-to-br from-emerald-400 to-emerald-600 flex flex-col items-center justify-center p-8 text-white">
        <Link to="/">
          <div className="inline-block p-2 bg-white bg-opacity-0 rounded">
            <img
              src={logo}
              alt="WealthMitra Logo"
              className="h-40 w-auto"
            />
          </div>
          </Link>
            <h1 className="text-4xl font-bold mb-2">WealthMitra</h1>
          
          <p className="text-center text-lg">Manage your finances with ease. Register now to get started!</p>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.passwordHash}
              onChange={(e) => setForm({ ...form, passwordHash: e.target.value })}
              required
              className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="text"
              placeholder="Role (optional)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Register
            </button>

            {/* Sign-in prompt */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
