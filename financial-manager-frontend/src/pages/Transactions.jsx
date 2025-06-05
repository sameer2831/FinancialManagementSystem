import { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import api from '../services/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await api.get('/transaction', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex font-sans bg-emerald-50">
          <Sidebar />
    
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8"></div>
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">All Transactions</h2>
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Date</th>
            <th className="py-2">Type</th>
            <th className="py-2">Category</th>
            <th className="py-2">Description</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index} className="border-b hover:bg-emerald-50">
              <td className="py-2">{new Date(txn.date).toLocaleDateString()}</td>
              <td className={`py-2 ${txn.type === 'Income' ? 'text-emerald-600' : 'text-red-500'}`}>{txn.type}</td>
              <td className="py-2">{txn.category}</td>
              <td className="py-2">{txn.description}</td>
              <td className="py-2 font-medium">${txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </main>
    </div>
  );
}
