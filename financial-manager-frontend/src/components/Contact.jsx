export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-emerald-50 text-gray-900 px-6 py-12">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-4xl font-bold text-emerald-700 mb-6">Contact Us</h2>
        <div className="max-w-2xl mx-auto text-gray-700">
          <p className="mb-4">Have questions or feedback? We’d love to hear from you.</p>
          <p className="mb-2">📧 <strong>Email:</strong> support@wealthmitra.com</p>
          <p className="mb-2">📞 <strong>Phone:</strong> +1 (800) 123-4567</p>
          <p className="mb-6">🕒 <strong>Support Hours:</strong> Mon–Fri, 9 AM – 6 PM EST</p>

          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md font-medium transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
