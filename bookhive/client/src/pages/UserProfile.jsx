import React, { useEffect, useState } from 'react';
import api from '../features/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/api/auth/profile');
        setName(data.name);
        setEmail(data.email);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/api/auth/profile', { name, email, password });
      toast.success('Profile updated successfully');
      setPassword('');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-indigo-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800 dark:text-white">User Profile</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Password (Leave blank to keep current)</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">Update Profile</button>
        </form>
      </div>
    </motion.div>
  );
};

export default UserProfile;
