import React, { useEffect, useState } from 'react';
import api from '../../features/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, books: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/admin/stats');
        setStats(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load dashboard stats');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 glass">
          <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Total Users</h2>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">{stats.users}</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-emerald-500 glass">
          <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Total Books</h2>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">{stats.books}</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-purple-500 glass">
          <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Total Orders</h2>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">{stats.orders}</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-pink-500 glass">
          <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Total Revenue</h2>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">${stats.revenue}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
