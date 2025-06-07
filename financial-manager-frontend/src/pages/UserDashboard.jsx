import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import Sidebar from '../components/SideBar';
import AddIncomeModal from '../components/AddIncomeModal';
import AddExpenseModal from '../components/AddExpenseModal';
//import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [username, setUsername] = useState('');
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [summary, setSummary] = useState({ month: '', totalIncome: 0, totalExpense: 0, netBalance: 0 });
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);

    fetchSummary();
    fetchCategorySummary();
    fetchTrendData();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/summary/monthly', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to load summary:', err);
    }
  };

  const fetchCategorySummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/summary/categories', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const { incomeByCategory, expenseByCategory } = res.data;

      const incomeBreakdown = Object.entries(incomeByCategory).map(([category, total]) => ({ category, total }));
      const expenseBreakdown = Object.entries(expenseByCategory).map(([category, total]) => ({ category, total }));

      setIncomeData(incomeBreakdown);
      setExpenseData(expenseBreakdown);
    } catch (err) {
      console.error('Failed to load category summary:', err);
    }
  };

  const fetchTrendData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/summary/trends', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setTrendData(res.data);
    } catch (err) {
      console.error('Failed to load trend data:', err);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-emerald-50">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-emerald-700">Welcome, {username || 'User'} 👋</h2>
            <p className="text-gray-500">Here's your financial overview</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500">For the Month of {summary.month}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard title="Total Income" amount={summary.totalIncome} color="text-emerald-700" />
          <SummaryCard title="Total Expenses" amount={summary.totalExpense} color="text-red-500" />
          <SummaryCard title="Current Balance" amount={summary.netBalance} color="text-emerald-700" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <ChartCard title="Income Breakdown" color="text-emerald-700">
            <PieChartWrapper data={incomeData} />
          </ChartCard>
          <ChartCard title="Expense Breakdown" color="text-red-500">
            <ExpensePieChartWrapper data={expenseData} />
          </ChartCard>
          <ChartCard title="Monthly Trends" color="text-emerald-700">
            <LineChartWrapper data={trendData} />
          </ChartCard>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <AddIncomeModal
              isOpen={showIncomeModal}
              onClose={() => setShowIncomeModal(false)}
              onSuccess={() => {
                fetchSummary();
                fetchCategorySummary();
                fetchTrendData();
              }}
            />

            <button
              className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
              onClick={() => setShowIncomeModal(true)}
            >
              Add Income
            </button>
            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <AddExpenseModal
                isOpen={showExpenseModal}
                onClose={() => setShowExpenseModal(false)}
                onSuccess={() => {
                fetchSummary();
                fetchCategorySummary();
                fetchTrendData();
              }} 
              />
              </div>
          <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={() => setShowExpenseModal(true)}>
            Add Expense
          </button>
          <button className="px-6 py-3 bg-emerald-100 text-emerald-800 border border-emerald-400 rounded-md hover:bg-emerald-200 transition">
            Generate Report
          </button>
        </div>
      </main>
    </div>
  );
}

// Subcomponents

const SummaryCard = ({ title, amount, color }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className={`text-2xl font-bold ${color} mt-2`}>${(amount ?? 0).toLocaleString()}</p>
  </div>
);

const ChartCard = ({ title, children, color }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h4 className={`text-lg font-semibold mb-4 ${color}`}>{title}</h4>
    {children}
  </div>
);

const PieChartWrapper = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie data={data.map(d => ({ name: d.category, value: d.total }))} dataKey="value" nameKey="name" outerRadius={80} label>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={['#34D399', '#10B981', '#F59E0B', '#6366F1', '#EF4444'][index % 5]} />
        ))}
      </Pie>
      <RechartsTooltip />
    </PieChart>
  </ResponsiveContainer>
);
const ExpensePieChartWrapper = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie data={data.map(d => ({ name: d.category, value: d.total }))} dataKey="value" nameKey="name" outerRadius={80} label>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={['#FF9C1A', '#EC1B09', '#f87171', '#facc15', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][index % 5]} />
        ))}
      </Pie>
      <RechartsTooltip />
    </PieChart>
  </ResponsiveContainer>
);
const LineChartWrapper = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <RechartsTooltip />
      <Legend />
      <Line type="monotone" dataKey="income" stroke="#10B981" />
      <Line type="monotone" dataKey="expense" stroke="#EF4444" />
    </LineChart>
  </ResponsiveContainer>
);
