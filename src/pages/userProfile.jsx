
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logout from '../components/Logout';

function UserProfile() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModel, setIsLogoutModel] = useState(false);

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  const closeMenu = () => {
    if (window.innerWidth < 1024) { 
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    closeMenu();
    setIsLogoutModel(true);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(true); 
      } else {
        setIsMenuOpen(false); 
      }
    };

    handleResize();

 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col lg:flex-row p-6">
    
      <div className="lg:hidden p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-red-500 focus:outline-none border border-gray-400 p-2 rounded-md"
        >
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      
      <div
        className={`flex-shrink-0 w-full lg:w-1/4 lg:h-full h-auto border-r lg:static bg-transparent lg:overflow-y-auto lg:py-6 ${
          isMenuOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <nav className="space-y-4 p-4 lg:p-0">
          <h2 className="text-lg font-semibold mb-4">Manage My Account</h2>
          <Link
            to=""
            onClick={closeMenu}
            className={`${
              location.pathname === '/user/profile'
                ? 'text-red-500 font-bold border-b-2 border-red-500'
                : 'text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-500'
            } block py-2`}
          >
            My Profile
          </Link>
          <Link
            to="orders"
            onClick={closeMenu}
            className={`${
              location.pathname === '/user/orders'
                ? 'text-red-500 font-bold border-b-2 border-red-500'
                : 'text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-500'
            } block py-2`}
          >
            My Orders
          </Link>
          <Link
            to="wishlist"
            onClick={closeMenu}
            className={`${
              location.pathname === '/user/wishlist'
                ? 'text-red-500 font-bold border-b-2 border-red-500'
                : 'text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-500'
            } block py-2`}
          >
            My Wishlist
          </Link>
          <Link
            to="shipping-address"
            onClick={closeMenu}
            className={`${
              location.pathname === '/user/address'
                ? 'text-red-500 font-bold border-b-2 border-red-500'
                : 'text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-500'
            } block py-2`}
          >
            Manage Address
          </Link>
          <Link
            to=""
            onClick={closeMenu}
            className={`${
              location.pathname === '/user/settings'
                ? 'text-red-500 font-bold border-b-2 border-red-500'
                : 'text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-500'
            } block py-2`}
          >
            Settings
          </Link>
         
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-500 py-2 block"
          >
            Logout
          </button>
        </nav>
      </div>

      {isLogoutModel && (
        <Logout onClose={() => setIsLogoutModel(false)} />
      )}

  
      <div className="flex-grow h-full overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
