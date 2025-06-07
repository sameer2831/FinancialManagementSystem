import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../components/SideBar';
import 'react-toastify/dist/ReactToastify.css';

export default function BudgetSetup() {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    periodType: 'Monthly',
    period: ''
  });

  const [budgets, setBudgets] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
    const token = localStorage.getItem('token');
      const res = await api.get('/budget',{
          headers: { Authorization: `Bearer ${token}` },
        });
      setBudgets(res.data);
    } catch (err) {
      toast.error('Failed to fetch budgets');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.periodType || !form.period) {
      toast.warning('Please fill all fields');
      return;
    }
    const payload = {
      Id: editingId ?? 0, 
    Amount: parseFloat(form.amount),
    Category: form.category,
    PeriodType: form.periodType,
    Period: form.period + '-01' // convert '2025-06' to '2025-06-01'
  };

    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await api.put(`/budget/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Budget updated successfully');
      } else {
        // Remove Id from payload for POST if your backend rejects it
        const { Id, ...postPayload } = payload;
        await api.post('/budget', postPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Budget added successfully');
      }
      setForm({ amount: '', category: '', periodType: 'Monthly', period: '' });
      setEditingId(null);
      fetchBudgets();
    } catch (err) {
      toast.error('Error saving budget');
    }
  };

  const handleEdit = (budget) => {
    setForm(budget);
    setEditingId(budget.id);
  };

  const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem('token');
      await api.delete(`/budget/${id}`,{
          headers: { Authorization: `Bearer ${token}` },
        });
      toast.success('Budget deleted');
      fetchBudgets();
    } catch (err) {
      toast.error('Error deleting budget');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-6 space-y-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">Budget Setup</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={form.periodType}
          onChange={(e) => setForm({ ...form, periodType: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <input
          type="month"
          value={form.period}
          onChange={(e) => setForm({ ...form, period: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Add'} Budget
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Existing Budgets</h3>
        <div className="bg-white shadow rounded divide-y">
          {budgets.map((b) => (
            <div key={b.id} className="p-3 flex justify-between items-center">
              <div>
                <p><strong>{b.category}</strong> - ${b.amount} ({b.periodType})</p>
                <p className="text-sm text-gray-600">Period: {b.period}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(b)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </main>
    </div>
  );
}
