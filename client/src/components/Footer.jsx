import React from 'react';

const Footer = () => (
  <footer className="bg-green-900 text-white py-8 mt-16">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
      <div className="mb-4 md:mb-0">
        <span className="font-bold text-lg">Sustainable Land</span> &copy; {new Date().getFullYear()}
      </div>
      <div className="flex space-x-6 text-2xl">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition"><i className="fab fa-twitter"></i>🐦</a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition"><i className="fab fa-facebook"></i>📘</a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition"><i className="fab fa-instagram"></i>📸</a>
        <a href="mailto:info@sustainableland.com" className="hover:text-green-300 transition"><i className="fas fa-envelope"></i>✉️</a>
      </div>
    </div>
  </footer>
);

export default Footer;
