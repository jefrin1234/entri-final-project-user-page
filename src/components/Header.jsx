import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Search, ShoppingCart, SunMoon, User } from 'lucide-react';
import { ThemeContext } from '../context/ThemeProvider';
import debounce from 'lodash.debounce'; // Import lodash debounce
import { useSelector } from 'react-redux';

function Header() {
 
  const items = useSelector(state=>state.cart.items)
  // console.log("items",items)
  
  const loggedIn = useSelector(state=>state.user.loggedIn)
 
  const navigate = useNavigate()
  const [searchValue,setSearchValue] = useState('')
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSearch = useCallback(
    debounce((value) => {
      if (value) {
        navigate(`/search?q=${value}`);
      }
    }, 500),
    []
  );

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <header className="sticky top-0 w-full bg-white dark:bg-black text-black dark:text-white shadow-md z-50 p-3">
      {/* Desktop version */}
      <div className="hidden md:flex justify-between items-center py-4 px-5 sm:px-10 md:px-20 lg:px-32">
        {/* Logo */}
        <div>
         <Link to={'/'}> <h1 className="text-xl font-bold">Trends</h1></Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 w-1/2">
          <input onChange={onSearchChange}
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent outline-none w-full text-black dark:text-white px-2 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button className="ml-2">
            <Search className="text-black dark:text-white w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link to="/" className="hover:text-green-500 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="about" className="hover:text-green-500 transition duration-300">About</Link>
            </li>
            <li>
            
            </li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex gap-6">
        <div className="relative">
      {/* Shopping Cart Button */}
      <button className="relative">
        <Link to="/cart">
          <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-green-500 transition duration-300" />
        </Link>
      </button>

      {/* Cart Count Badge */}
      {items.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-lg transform hover:scale-110 transition duration-300">
          {items.length}
        </div>
      )}
    </div>
          <button>
            <Link to="/favourites"><Heart className="w-6 h-6 hover:text-green-500 transition duration-300" /></Link>
          </button>
         {
          loggedIn ? (
             <button>
            <Link to="user"><User className="w-6 h-6 hover:text-green-500 transition duration-300" /></Link>
          </button>
          ): (
            <Link 
            to={'login'}  
            className="text-black hover:text-green-500 transition duration-300 cursor-pointer border-b-2 border-transparent hover:border-green-500  dark:text-white"
          >
            Login
          </Link>
          
            )
         }
        </div>

        {/* Theme Toggle */}
        <div className="ml-4">
          <button onClick={toggleTheme}>
            <SunMoon className="w-6 h-6 hover:text-green-500 transition duration-300" />
          </button>
        </div>
      </div>

      {/* Mobile version */}
      <div className="md:hidden flex justify-between items-center px-5 py-3 bg-white dark:bg-black text-black dark:text-white shadow-md z-50">
        <div>
          <h1 className="text-xl font-bold">Trends</h1>
        </div>
        <button onClick={toggleTheme}>
          <SunMoon className="w-6 h-6 hover:text-green-500 transition duration-300" />
        </button>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden flex items-center bg-gray-100 rounded-lg px-3 py-1 dark:bg-gray-700 m-3 ">
        <Search className="text-gray-600 w-5 h-5 dark:text-gray-400" />
        <input onChange={onSearchChange}
          type="text"
          value={searchValue}
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-gray-600 px-2 dark:text-gray-300"
        />
      </div>

      {/* Mobile Navigation Links */}
      <nav className="md:hidden flex justify-around mt-3 bg-white dark:bg-black text-black dark:text-white shadow-md z-50">
        <Link to="/" className="hover:text-green-500 transition duration-300">Home</Link>
        <Link to="about" className="hover:text-green-500 transition duration-300">About</Link>
      
        <div className="relative">
      {/* Shopping Cart Button */}
      <button className="relative">
        <Link to="/cart">
          <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-green-500 transition duration-300" />
        </Link>
      </button>

      {/* Cart Count Badge */}
      {items.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-lg transform hover:scale-110 transition duration-300">
          {items.length}
        </div>
      )}
    </div>
        <Link to="/favourites" className="hover:text-green-500 transition duration-300"><Heart className="w-6 h-6" /></Link>
        {
          loggedIn ? (
             <button>
            <Link to="user"><User className="w-6 h-6 hover:text-green-500 transition duration-300" /></Link>
          </button>
          ): (
            <Link 
            to={'login'}  
            className="text-black hover:text-green-500 transition duration-300 cursor-pointer border-b-2 border-transparent hover:border-green-500  dark:text-white"
          >
            Login
          </Link>
            )
         }
      </nav>
    </header>
  );
}

export default Header;
