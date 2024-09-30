import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Footer() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-rose-200 dark:bg-black text-black dark:text-white py-10">
      <footer className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Subscribe Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Exclusive</h2>
            <p className="mb-2">Subscribe</p>
            <p className="mb-4">Get 10% off your first order</p>
            <form className="flex items-center border-b border-gray-600 py-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none w-full placeholder-gray-400 focus:outline-none"
              />
              <button type="submit" className="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">My Account</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Login / Register</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Cart</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Wishlist</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Link</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Terms Of Use</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* App Download & Social Icons Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-300 pt-6">
          <div className="flex items-center space-x-4 mb-6 sm:mb-0">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhI_F07udHAXTpGvZ8Ca_WG54PXOnl6n3HFDafZ2Pk4wn6Za7V9EZeGRoy-m34J8CTCI&usqp=CAU" alt="QR Code" className="w-16 h-16" />
            <div>
              <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCf805gmp1HbJe0bMFd37wJ5CTpk2IexqLQ&s" alt="Google Play" className="mb-2" /></a>
              <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7yCitZIKc8Ms-c1VZGTdiIa0BLE98ORdhP-VvhydEhV_yULs12xdPd3HxcjQES7mjhQ&usqp=CAU" alt="App Store" /></a>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Links Section (Seller and Admin) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
          <div className="text-green-600">
            <a href="http://localhost:5174" className="hover:underline">Want to become a seller?</a>
          </div>
          {user?.roles?.includes('admin') && (
            <div className="text-green-600">
              <a href="http://localhost:5175" className="hover:underline">Admin Panel</a>
            </div>
          )}
        </div>

        {/* Footer Copy Right */}
        <div className="mt-8 text-center text-gray-500">
          &copy; Copyright Rimel 2022. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
