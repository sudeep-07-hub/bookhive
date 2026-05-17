import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../features/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { clearCart } from '../features/cartSlice';

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotalAmount = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) : 0;
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderedItems: cartItems.map((item) => ({
          name: item.title,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          book: item.book || item._id,
        })),
        shippingDetails: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice: cartTotalAmount,
        taxPrice: cartTotalAmount * 0.1,
        shippingPrice: 10.0,
        totalAmount: cartTotalAmount + cartTotalAmount * 0.1 + 10.0,
      };

      const { data } = await api.post('/api/orders', orderData);
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate(`/orders/${data._id}`);
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  if (!cartItems || cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={placeOrder} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Shipping details</h2>
            <div className="mb-4">
              <label className="block text-slate-700 dark:text-slate-300 mb-2">Address</label>
              <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-2">City</label>
                <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-3 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-2">Postal Code</label>
                <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full p-3 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-slate-700 dark:text-slate-300 mb-2">Country</label>
              <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-3 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Payment Method</h2>
            <div className="mb-6">
              <label className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <input type="radio" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio h-5 w-5 text-indigo-600" />
                <span>Credit Card or PayPal</span>
              </label>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">Place Order</button>
          </form>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg sticky top-8">
            <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Order Summary</h2>
            <div className="flex justify-between mb-4 text-slate-600 dark:text-slate-300">
              <span>Items</span>
              <span>${cartTotalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-slate-600 dark:text-slate-300">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between mb-4 text-slate-600 dark:text-slate-300">
              <span>Tax</span>
              <span>${(cartTotalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 text-xl font-bold text-slate-800 dark:text-white border-t pt-4">
              <span>Total</span>
              <span>${(cartTotalAmount + cartTotalAmount * 0.1 + 10.0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
