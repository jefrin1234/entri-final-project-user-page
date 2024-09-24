
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logout from '../components/Logout';

function UserProfile() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModel, setIsLogoutModel] = useState(false);

  // Toggle menu function for medium and small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu on link click for medium and small screens
  const closeMenu = () => {
    if (window.innerWidth < 1024) { // Applies to md and below screens
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    closeMenu();
    setIsLogoutModel(true);
  };

  // Ensure the menu closes on resize for large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(true); // Automatically open the menu on large screens
      } else {
        setIsMenuOpen(false); // Close menu on smaller screens
      }
    };

    // Set initial menu visibility based on screen size
    handleResize();

    // Add event listener for resizing the screen
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col lg:flex-row p-6">
      {/* Hamburger menu for medium and smaller screens */}
      <div className="lg:hidden p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-red-500 focus:outline-none border border-gray-400 p-2 rounded-md"
        >
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      {/* Sidebar Navigation */}
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
            to="address"
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
            to="settings"
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

      {/* Main Content */}
      <div className="flex-grow h-full overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
