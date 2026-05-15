import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              BookHive
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your favorite online bookstore. Read, learn, and grow.
            </p>
          </div>
          <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-primary-500 transition-colors">About Us</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Contact</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} BookHive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
