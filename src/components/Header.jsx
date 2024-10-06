import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Search, ShoppingCart, SunMoon, User } from 'lucide-react';
import { ThemeContext } from '../context/ThemeProvider';
import debounce from 'lodash.debounce'; 
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Header() {
  const items = useSelector(state => state.cart.items);
  const { favourites } = useSelector(state => state.favourite);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
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

  const handleCart = ()=>{
    if(!loggedIn){
      navigate('/login')
      toast.error("please login")
    }else{
      navigate('cart')
    }
  }

  const handleFavourite = ()=>{
    if(!loggedIn){
      navigate('/login')
      toast.error("please login")
    }else{
      navigate('favourites')
    }
  }

  return (
 
    <header className="sticky top-0 w-full bg-white dark:bg-black text-black dark:text-white shadow-md z-50 p-3">
  
  <div className="hidden xl:flex justify-between items-center py-4 px-5 sm:px-10 md:px-20 lg:px-32">
    <div>
      <Link to={'/'}><h1 className="text-xl font-bold">Trends</h1></Link>
    </div>

    <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600 w-1/2">
      <input
        onChange={onSearchChange}
        type="text"
        placeholder="What are you looking for?"
        className="bg-transparent outline-none w-full text-black dark:text-white px-2 placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button className="ml-2">
        <Search className="text-black dark:text-white w-5 h-5" />
      </button>
    </div>

    <nav>
      <ul className="flex gap-8">
        <li>
          <Link to="/" className="hover:text-green-500 transition duration-300">Home</Link>
        </li>
        <li>
          <Link to="about" className="hover:text-green-500 transition duration-300">About</Link>
        </li>
      </ul>
    </nav>

    <div className="flex gap-6 items-center">
      
      <div className="relative">
        <button onClick={handleCart}>
          <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-green-500 transition duration-300" />
        </button>
        {items.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-lg">
            {items.length}
          </div>
        )}
      </div>

      
      <div className="relative">
        <button onClick={handleFavourite}>
          <Heart className="w-6 h-6 hover:text-green-500 transition duration-300" />
        </button>
        {favourites?.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-lg">
            {favourites.length}
          </div>
        )}
      </div>

    
      {loggedIn ? (
        <Link to="user">
          <User className="w-6 h-6 hover:text-green-500 transition duration-300" />
        </Link>
      ) : (
        <Link to={'login'} className="hover:text-green-500 transition duration-300 border-b-2 border-transparent hover:border-green-500">
          Login
        </Link>
      )}

      
      <button onClick={toggleTheme}>
        <SunMoon className="w-6 h-6 hover:text-green-500 transition duration-300" />
      </button>
    </div>
  </div>


  <div className="flex xl:hidden justify-between items-center px-5 py-3 bg-white dark:bg-black shadow-md">
    <div>
      <h1 className="text-xl font-bold">Trends</h1>
    </div>
    <button onClick={toggleTheme}>
      <SunMoon className="w-6 h-6 hover:text-green-500 transition duration-300" />
    </button>
  </div>


  <div className="flex xl:hidden items-center bg-gray-100 rounded-lg px-3 py-1 dark:bg-gray-700 m-3">
    <Search className="text-gray-600 w-5 h-5 dark:text-gray-400" />
    <input
      onChange={onSearchChange}
      type="text"
      value={searchValue}
      placeholder="Search..."
      className="bg-transparent outline-none w-full text-gray-600 px-2 dark:text-gray-300"
    />
  </div>


  <nav className="flex xl:hidden justify-around mt-3 bg-white dark:bg-black text-black dark:text-white shadow-md">
    <Link to="/" className="hover:text-green-500 transition duration-300">Home</Link>
    <Link to="about" className="hover:text-green-500 transition duration-300">About</Link>

    <div className="relative">
      <button onClick={handleCart}>
        <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-green-500 transition duration-300" />
      </button>
      {items.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-lg">
          {items.length}
        </div>
      )}
    </div>

    <div className="relative">
      <button onClick={handleFavourite}>
        <Heart className="w-6 h-6 hover:text-green-500 transition duration-300" />
      </button>
      {favourites?.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-lg">
          {favourites.length}
        </div>
      )}
    </div>

    {loggedIn ? (
      <Link to="user">
        <User className="w-6 h-6 hover:text-green-500 transition duration-300" />
      </Link>
    ) : (
      <Link to={'login'} className="hover:text-green-500 transition duration-300 border-b-2 border-transparent hover:border-green-500">
        Login
      </Link>
    )}
     {!loggedIn ? (
     ''
    ) : (
      <Link to={'signup'} className="hover:text-green-500 transition duration-300 border-b-2 border-transparent hover:border-green-500">
        SignIn
      </Link>
    )}
    

  </nav>
</header>

  );
}

export default Header;
