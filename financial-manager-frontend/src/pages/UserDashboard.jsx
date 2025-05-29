export default function UserDashboard() {
  const username = localStorage.getItem('username'); // Optional: Store username during login

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-emerald-700 mb-4">Welcome to WealthMintra</h2>
        <p className="text-lg text-gray-700 mb-6">
          Hello{username ? `, ${username}` : ''}! This is your personal dashboard where you can manage your finances.
        </p>
        <div className="space-y-4">
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
            View Expenses
          </button>
          <button className="px-6 py-2 bg-emerald-100 border border-emerald-400 text-emerald-700 rounded-md hover:bg-emerald-200 transition">
            Add Income
          </button>
        </div>
      </div>
    </div>
  );
}
