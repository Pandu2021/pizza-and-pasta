// ========================================================================
// FILE: src/components/layout/Footer.jsx
// ========================================================================
import React, { useState, useEffect } from 'react';

// SVG Icon for Facebook
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

// SVG Icon for Instagram
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.626c-3.142 0-3.496.011-4.716.068-2.65.121-3.548 1.022-3.668 3.668-.057 1.22-.067 1.573-.067 4.716s.01 3.496.067 4.716c.12 2.646 1.018 3.548 3.668 3.668 1.22.057 1.573.067 4.716.067s3.496-.01 4.716-.067c2.65-.121 3.548-1.022 3.668-3.668.057-1.22.067-1.573.067-4.716s-.01-3.496-.067-4.716c-.12-2.646-1.018-3.548-3.668-3.668C15.496 3.799 15.142 3.789 12 3.789zM12 8a4 4 0 100 8 4 4 0 000-8zm0 6.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm6.5-8.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" />
  </svg>
);


const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Check restaurant open/closed status
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      // Set time zone to Thailand (Indochina Time, ICT, UTC+7)
      const options = { timeZone: 'Asia/Bangkok', hour: '2-digit', hour12: false };
      const hourInThailand = parseInt(new Intl.DateTimeFormat('en-US', options).format(now), 10);
      
      // Opening hours from 12 PM (12) to 11 PM (23)
      const openHour = 12;
      const closeHour = 23;

      if (hourInThailand >= openHour && hourInThailand < closeHour) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkOpenStatus();
    // Optional: update status every minute
    const interval = setInterval(checkOpenStatus, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* Column 1: About & Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold mb-4 font-serif">Epic Pizza and Pasta</h3>
            {/* tagline removed as requested */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/epicpizzapasta" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/epicpizzaandpasta/#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Opening Hours & Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Opening Hours</h3>
            <div className="text-gray-400 mb-6">
              <p>Every Day: 12:00 PM - 11:00 PM</p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <span className={`h-3 w-3 rounded-full mr-2 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Currently: {isOpen ? <span className="text-green-400">Open</span> : <span className="text-red-400">Closed</span>}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/order" className="text-gray-400 hover:text-white transition-colors">Menu</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              <a href="tel:+66955697525" className="hover:text-white transition-colors">+66 95 569 7525</a>
            </p>
            <p className="text-gray-400 mb-2">
              <a href="mailto:epicpizzaandpasta@gmail.com" className="hover:text-white transition-colors">epicpizzaandpasta@gmail.com</a>
            </p>
            <p className="text-gray-400 leading-relaxed">
              1, 15 ซ. นนทบุรี 18/1 Bang Krasor, อำเภอเมืองนนทบุรี นนทบุรี 11000, Thailand
            </p>
          </div>

        </div>
        <div className="text-center text-gray-500 border-t border-gray-700 mt-10 pt-6">
          <p>&copy; {new Date().getFullYear()} Epic Pizza and Pasta. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;