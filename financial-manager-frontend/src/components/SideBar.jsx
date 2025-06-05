import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-transparent.png';

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
      <div className="text-sm text-gray-500">
        <p>Track. Plan. Grow.</p>
      </div>
    </aside>
  );
}
