import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { logout } from '../../features/authSlice';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="glass fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              BookHive
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/books" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium transition-colors">
              Books
            </Link>
            
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              <FiShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <FiUser className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">{userInfo.name}</span>
                </Link>
                {userInfo.role === 'Admin' && (
                  <Link to="/admin/dashboard" className="text-accent-500 hover:text-accent-600 font-medium transition-colors">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors">
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
