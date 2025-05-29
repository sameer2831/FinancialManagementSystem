export default function Blogs() {
  return (
    <section id="blogs" className="min-h-screen flex items-center justify-center  text-gray-900 px-6 py-12">
      <div className="max-w-6xl w-full text-center">
        <h2 className="text-4xl font-bold text-emerald-700 mb-10">Latest Blogs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">5 Simple Budgeting Strategies That Actually Work</h3>
            <p className="text-gray-600">Discover practical budgeting methods you can start today—even if you’re not a finance expert.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">Stock Market 101: A Beginner’s Guide to Investing</h3>
            <p className="text-gray-600">New to investing? Learn how to read stock charts and track performance like a pro.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">How to Use Financial Dashboards for Smarter Decisions</h3>
            <p className="text-gray-600">Visualize your financial health with tools that go beyond spreadsheets.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
