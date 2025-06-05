import { useState } from 'react';
import api from '../services/api';

export default function IncomeComponent() {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState('');

  const fetchIncomes = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found. Please log in.');
      return;
    }

    try {
      const res = await api.get('/income', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setIncomes(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Failed to fetch incomes');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Test Income API</h2>
      <button 
        onClick={fetchIncomes} 
        className="mb-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
      >
        Fetch Incomes
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="list-disc pl-6">
        {incomes.map((income, index) => (
          <li key={index}>
            <strong>{income.category}</strong>: ${income.amount} on {new Date(income.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
