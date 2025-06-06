import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/SideBar';
import AddExpenseModal from '../components/AddExpenseModal'; // Reused
import ExpenseChart from '../components/ExpenseChart';
import ExpensePie from '../components/ExpensePie';

export default function UserExpense() {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateRange, setDateRange] = useState('All');
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/expense', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    let result = expenses;
    if (search) {
      result = result.filter(
        (i) =>
          i.description.toLowerCase().includes(search.toLowerCase()) ||
          i.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter) {
      result = result.filter((i) => i.category === categoryFilter);
    }
    if (dateRange !== 'All') {
      const now = new Date();
      let start;
      if (dateRange === 'Monthly') {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
      } else if (dateRange === 'Quarterly') {
        start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      } else if (dateRange === 'Yearly') {
        start = new Date(now.getFullYear(), 0, 1);
      }
      result = result.filter((i) => new Date(i.date) >= start);
    }
    setFiltered(result);
  }, [search, categoryFilter, dateRange, expenses]);

  const totalExpense = filtered.reduce((sum, i) => sum + i.amount, 0);
  const topCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const getMonthlyExpenseData = (entries) => {
    const monthlyTotals = {};

    entries.forEach((entry) => {
      const date = new Date(entry.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // e.g. "2025-01"
      monthlyTotals[key] = (monthlyTotals[key] || 0) + entry.amount;
    });

    // Convert to array, sort by date, then format label for chart
    return Object.entries(monthlyTotals)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([key, amount]) => {
        const [year, month] = key.split('-');
        const label = new Date(year, month - 1).toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        });
        return { month: label, amount };
      });
  };


  const topCategoryName = Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  const avgMonthly = (expenses.length > 0)
    ? (expenses.reduce((sum, i) => sum + i.amount, 0) / new Set(expenses.map(i => new Date(i.date).getMonth())).size).toFixed(2)
    : 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-red-700">Expense Overview</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 text-sm">Total Expense This Month</h3>
            <p className="text-2xl font-semibold text-red-600">$ {totalExpense.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 text-sm">Top Category</h3>
            <p className="text-2xl font-semibold text-red-600">{topCategoryName}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 text-sm">Avg Monthly Expense</h3>
            <p className="text-2xl font-semibold text-red-600">$ {avgMonthly}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search description or category..."
            className="border p-2 rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded w-full md:w-1/4"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Rent">Rent</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Dining">Dining</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Insurance">Insurance</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="border p-2 rounded w-full md:w-1/4"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="All">All Time</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseChart data={getMonthlyExpenseData(filtered)} />
          <ExpensePie data={filtered} />
        </div>

        {/* Add Expense */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowExpenseModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            + Add Expense
          </button>
          <AddExpenseModal
            isOpen={showExpenseModal}
            onClose={() => setShowExpenseModal(false)}
            onSuccess={() => {
              setShowExpenseModal(false);
              const token = localStorage.getItem('token');
              api.get('/expense', {
                headers: { Authorization: `Bearer ${token}` },
              }).then(res => {
                setExpenses(res.data);
                setFiltered(res.data);
              }).catch(err => console.error('Failed to refresh expense:', err));
            }}
          />
        </div>

        {/* Expense Table */}
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense Records</h3>

          {loading ? (
            <p>Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500">No expense data available.</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-red-100 text-red-700">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2 text-right">Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-red-600 font-medium">Spent</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.description}</td>
                    <td className="px-4 py-2 text-right font-semibold">$ {item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
