import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/SideBar';
import IncomeChart from '../components/IncomeChart';
import IncomePie from '../components/IncomePie';
import AddIncomeModal from '../components/AddIncomeModal'; // Reused

export default function UserIncome() {
  const [incomes, setIncomes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateRange, setDateRange] = useState('All');
  const [showIncomeModal, setShowIncomeModal] = useState(false);


  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/income', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncomes(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch income:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncome();
  }, []);

  useEffect(() => {
    let result = incomes;
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
  }, [search, categoryFilter, dateRange, incomes]);

  const totalIncome = filtered.reduce((sum, i) => sum + i.amount, 0);
  const topCategory = incomes.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  // Function to group and sum income by month
  const getMonthlyIncomeData = (entries) => {
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
  const avgMonthly = (incomes.length > 0) ? (incomes.reduce((sum, i) => sum + i.amount, 0) / new Set(incomes.map(i => new Date(i.date).getMonth())).size).toFixed(2) : 0;


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-emerald-700">Income Overview</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 text-sm">Total Income This Month</h3>
            <p className="text-2xl font-semibold text-emerald-600">$ {totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 text-sm">Top Category</h3>
            <p className="text-2xl font-semibold text-emerald-600">{topCategoryName}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 text-sm">Avg Monthly Income</h3>
            <p className="text-2xl font-semibold text-emerald-600">$ {avgMonthly}</p>
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
            <option value="Salary">Salary</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Business">Business</option>
            <option value="Investment">Investment</option>
            <option value="RentalIncome">RentalIncome</option>
            <option value="Gifts">Gifts</option>
            <option value="Refunds">Refunds</option>
            <option value="Interests">Interests</option>
            <option value="Others">Others</option>
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
          <IncomeChart data={getMonthlyIncomeData(filtered)} />
          <IncomePie data={filtered} />
        </div>

        {/* Add Income (Reused Component) */}
        <div className="flex justify-end">
        <button
            onClick={() => setShowIncomeModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
            + Add Income
        </button>
          <AddIncomeModal
            isOpen={showIncomeModal}
            onClose={() => setShowIncomeModal(false)}
            onSuccess={() => {
                setShowIncomeModal(false);
                const token = localStorage.getItem('token');
                api.get('/income', {
                headers: { Authorization: `Bearer ${token}` },
                }).then(res => {
                setIncomes(res.data);
                setFiltered(res.data);
                }).catch(err => console.error('Failed to refresh income:', err));
            }}
            />
        </div>

        {/* Income Table */}
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Income Records</h3>

          {loading ? (
            <p>Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500">No income data available.</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-emerald-100 text-emerald-700">
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
                    <td className="px-4 py-2 text-green-600 font-medium">Received</td>
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
