import { useState } from 'react';
import api from '../services/api';

export default function AddExpenseModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/expense', {
        Amount: parseFloat(form.amount),
        Category: form.category,
        Date: new Date(form.date).toISOString(),
        Description: form.description
      }, {
        headers: { authorization: `Bearer ${token}` }
      });

      onSuccess?.();
      onClose();
      setForm({ amount: '', category: '', date: '', description: '' });
    } catch (err) {
      console.error('Expense creation failed', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-red-600">Add Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            {[
              'Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment',
              'Dining', 'Healthcare', 'Insurance', 'Education', 'Travel',
              'Shopping', 'Subscriptions', 'Other'
            ].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
            rows="3"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Submit
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
