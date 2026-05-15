import React, { useEffect, useState } from 'react';
import api from '../features/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/api/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <h2 className="text-2xl text-slate-600 dark:text-slate-300">You have no orders yet.</h2>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                <th className="p-4 border-b dark:border-slate-600">ORDER ID</th>
                <th className="p-4 border-b dark:border-slate-600">DATE</th>
                <th className="p-4 border-b dark:border-slate-600">TOTAL</th>
                <th className="p-4 border-b dark:border-slate-600">PAID</th>
                <th className="p-4 border-b dark:border-slate-600">DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                  <td className="p-4 text-indigo-500 hover:underline">{order._id.substring(0, 10)}...</td>
                  <td className="p-4 text-slate-800 dark:text-slate-300">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-4 text-slate-800 dark:text-slate-300">${order.totalAmount}</td>
                  <td className="p-4 text-slate-800 dark:text-slate-300">
                    {order.isPaid ? order.paidAt.substring(0, 10) : <span className="text-red-500 font-semibold">No</span>}
                  </td>
                  <td className="p-4 text-slate-800 dark:text-slate-300">
                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : <span className="text-red-500 font-semibold">No</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default OrderHistory;
