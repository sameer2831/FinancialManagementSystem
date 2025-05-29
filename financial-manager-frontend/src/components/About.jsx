
export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center text-gray-900 px-6"
    >
      <div className="max-w-4xl text-center bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-emerald-700 mb-6">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Managing personal finances shouldn’t be complicated. <span className="font-semibold text-emerald-600">WealthMitra</span> is designed for everyday users—whether you're a student, an early-stage investor, or someone who simply wants to stay on top of expenses. With intuitive tools for tracking income, budgeting, and monitoring real-time stock performance, we bring clarity to your financial world—all in one place.
        </p>
      </div>
    </section>
  );
}
