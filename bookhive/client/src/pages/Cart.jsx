import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../features/cartSlice';
import { FiTrash2 } from 'react-icons/fi';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=checkout');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="glass p-10 text-center rounded-2xl">
            <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4">Your cart is empty</h2>
            <Link to="/books" className="text-primary-600 hover:text-primary-500 font-medium">
              Go Back to Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.book} className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-16 h-24 object-cover rounded-md" />
                      <div>
                        <Link to={`/books/${item.book}`} className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-500">
                          {item.title}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="font-medium text-gray-900 dark:text-white">Qty: {item.quantity}</div>
                      <button 
                        onClick={() => removeFromCartHandler(item.book)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-bold text-gray-900 dark:text-white">${subtotal}</span>
                </div>
                <button
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
