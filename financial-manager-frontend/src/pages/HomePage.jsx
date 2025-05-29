import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.png'; 
import home from '../assets/home.png';
import About from '../components/About';
import Contact from '../components/Contact';
import Solutions from '../components/Solutions';
import Blogs from '../components/Blogs';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 text-gray-900 font-sans">
      {/* Navbar */}
      <header className="flex flex-wrap justify-between items-center px-10 py-6 sticky top-0 bg-white shadow-md z-50">
        <h1 className="text-2xl font-extrabold text-emerald-700">WealthMitra</h1>
        
        <nav className="flex gap-6 text-sm mt-4 md:mt-0">
          <a href="#home" className="hover:text-emerald-600 hover:font-bold transition-all duration-300 ">Home</a>
          <a href="#about" className="hover:text-emerald-600 hover:font-bold transition-all duration-300">About Us</a>
          <a href="#solutions" className="hover:text-emerald-600 hover:font-bold transition-all duration-300">Solutions</a>
          <a href="#blogs" className="hover:text-emerald-600 hover:font-bold transition-all duration-300">Blogs</a>
          <a href="#contact" className="hover:text-emerald-600 hover:font-bold transition-all duration-300">Contact</a>
        </nav>

        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            Get Started Now
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-100"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col md:flex-row justify-center items-center px-10 py-16 bg-gradient-to-tr from-emerald-100 to-white"
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 leading-tight mb-6">
            Your Secure Gateway to Simple, <br />
            <span className="text-emerald-500">{'{ Smart Finances }'}</span>
          </h2>
          <p className="text-gray-700 mb-6">
            Unlock seamless financial management with WealthMitra—built for security, simplicity, and peace of mind.
          </p>
          <div className="flex gap-4">
            <Link to="/register" className="bg-emerald-600 text-white px-5 py-2 rounded-md font-medium hover:bg-emerald-700">
              Get Started Now
            </Link>
            <button className="border border-emerald-600 text-emerald-600 px-5 py-2 rounded-md hover:bg-emerald-100">
              Request a Demo
            </button>
          </div>
         
        </div>
         
        <div className="mt-20 md:mt-0 max-w-sm">
          <img src={home} alt="Home" className="w-full h-auto rounded-lg " />
        </div>
         
      </section>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          minHeight: '100vh',
        }}
      >
        {/* About Section */}
        <section id="about" >
          <About />
        </section>

        {/* Solutions Section */}
        <section id="solutions" >
          <Solutions />
        </section>

        {/* Blogs Section */}
        <section id="blogs" >
          <Blogs />
        </section>
      </div>
      {/* Contact Section */}
      <section id="contact" className="bg-emerald-50 py-16">
        <Contact />
      </section>

      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 WealthMitra. All rights reserved.
      </footer>
    </div>
  );
}
