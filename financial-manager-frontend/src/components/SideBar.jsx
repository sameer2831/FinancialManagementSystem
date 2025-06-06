import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-transparent.png';
import api from '../services/api';

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `block py-2 px-3 rounded hover:bg-emerald-100 ${
      isActive ? 'bg-emerald-100 font-semibold text-emerald-700' : ''
    }`;

  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8 flex flex-col justify-between">
      <div>
        <img src={logo} alt="WealthMitra Logo" className="h-16 mb-14" />
        <nav className="space-y-4 text-gray-700">
          <NavLink to="/user-dashboard" className={linkClasses}>Dashboard</NavLink>
          <NavLink to="/user-income" className={linkClasses}>Income</NavLink>
          <NavLink to="/user-expense" className={linkClasses}>Expenses</NavLink>
          <NavLink to="/user-transactions" className={linkClasses}>Transactions</NavLink>
          <NavLink to="/reports" className={linkClasses}>Reports</NavLink>
          <NavLink to="/settings" className={linkClasses}>Settings</NavLink>
        </nav>
      </div>
      

      <div className="text-sm text-emerald-500">
      <button
        onClick={async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await api.post(
              '/user/logout',
              {}, // no body content
              {
                headers: {
                  authorization: `Bearer ${token}`
                }
              }
            );

            if (response.status === 200) {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              window.location.href = '/login';
            } else {
              console.error('Logout failed');
            }
          } catch (err) {
            console.error('Error during logout', err);
          }
        }}
        className="flex items-center gap-2 text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1" />
        </svg>
        Logout
      </button>
        <p>Track. Plan. Grow.</p>
      </div>
    </aside>
  );
}
