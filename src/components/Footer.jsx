import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
function Footer() {
  return (
    
  <div>
      <footer className=" bg-rose-200 text-black  font-bold border  py-10 dark:bg-black dark:text-white mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4">
        
        {/* Exclusive Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Exclusive</h2>
          <p className="mb-2">Subscribe</p>
          <p className="mb-4">Get 10% off your first order</p>
          <form className="flex items-center border-b border-gray-600 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none w-full text-white placeholder-gray-400 focus:outline-none"
            />
            <button type="submit" className="ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* Quick Link Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Link</h2>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Terms Of Use</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Download App</h2>
          <p className="mb-4">Save $3 with App New User Only</p>
          <div className="flex mb-4">
            <img src="https://via.placeholder.com/100x100.png" alt="QR Code" className="w-16 h-16 mr-4" />
            <div>
              <a href="#"><img src="https://via.placeholder.com/120x40.png" alt="Google Play" /></a>
              <a href="#"><img src="https://via.placeholder.com/120x40.png" alt="App Store" /></a>
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
      </div>

      <div className="mt-8 text-center text-gray-500">
        &copy; Copyright Rimel 2022. All rights reserved.
      </div>
    </footer>
  </div>

  )
}

export default Footer
