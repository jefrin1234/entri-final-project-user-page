import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Footer() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-rose-200 dark:bg-gray-900 text-gray-900 dark:text-gray-300 py-12">
      <footer className="container mx-auto px-4">
        {/* Footer Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          
          {/* Subscribe Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Exclusive</h2>
            <p className="mb-4">Subscribe to get 10% off your first order</p>
            <form className="flex items-center border-b border-gray-600 dark:border-gray-500 py-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none w-full placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
              <button type="submit" className="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
          
          {/* Support Section */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Support</h2>
            <p className="mb-1">111 Bijoy Sarani, Dhaka, Bangladesh</p>
            <p className="mb-1">exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Account</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">My Account</a></li>
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">Login / Register</a></li>
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">Cart</a></li>
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">Wishlist</a></li>
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">Shop</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">FAQ</a></li>
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-400">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* App Download and Social Links Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700 pt-8">
         
          {/* Social Media Links */}
          <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-100">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-100">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-100">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-100">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Links Section (Seller and Admin) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
          <div className="text-green-600">
            <a href="https://entri-final-project-seller-page.vercel.app/" className="hover:underline">Want to become a seller?</a>
          </div>
          {user?.roles?.includes('admin') && (
            <div className="text-green-600">
              <a href="https://entr-final-project-admin-pannel.vercel.app/" className="hover:underline">Admin Panel</a>
            </div>
          )}
        </div>

        {/* Footer Copyright */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          &copy; Copyright Rimel 2022. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
