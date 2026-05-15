import React, { useEffect, useState } from 'react';
import api from '../../features/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/api/admin/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/api/admin/users/${id}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Manage Users</h1>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <th className="p-4 border-b dark:border-slate-600">ID</th>
              <th className="p-4 border-b dark:border-slate-600">NAME</th>
              <th className="p-4 border-b dark:border-slate-600">EMAIL</th>
              <th className="p-4 border-b dark:border-slate-600">ADMIN</th>
              <th className="p-4 border-b dark:border-slate-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <td className="p-4 text-slate-800 dark:text-slate-300">{user._id.substring(0, 10)}...</td>
                <td className="p-4 text-slate-800 dark:text-slate-300 font-medium">{user.name}</td>
                <td className="p-4 text-slate-800 dark:text-slate-300">
                  <a href={`mailto:${user.email}`} className="text-indigo-500 hover:underline">{user.email}</a>
                </td>
                <td className="p-4 text-slate-800 dark:text-slate-300">
                  {user.role === 'Admin' ? (
                    <span className="text-emerald-500 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
                <td className="p-4">
                  <button className="text-indigo-500 hover:text-indigo-700 mr-4 transition">Edit</button>
                  <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageUsers;
