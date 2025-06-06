import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#FF9C1A', '#EC1B09', '#f87171', '#facc15', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

const getCategoryData = (data) => {
  const categoryMap = {};
  data.forEach((entry) => {
    categoryMap[entry.category] = (categoryMap[entry.category] || 0) + entry.amount;
  });
  return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
};

const ExpensePie = ({ data }) => {
  const pieData = getCategoryData(data);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-red-600 mb-4">Expense Category Breakdown</h3>
      {pieData.length === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$ ${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpensePie;
