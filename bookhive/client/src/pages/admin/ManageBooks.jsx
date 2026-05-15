import React, { useEffect, useState } from 'react';
import api from '../../features/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get('/api/books');
      setBooks(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load books');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/api/books/${id}`);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Books</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Add New Book</button>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <th className="p-4 border-b dark:border-slate-600">ID</th>
              <th className="p-4 border-b dark:border-slate-600">TITLE</th>
              <th className="p-4 border-b dark:border-slate-600">PRICE</th>
              <th className="p-4 border-b dark:border-slate-600">CATEGORY</th>
              <th className="p-4 border-b dark:border-slate-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <td className="p-4 text-slate-800 dark:text-slate-300">{book._id.substring(0, 10)}...</td>
                <td className="p-4 text-slate-800 dark:text-slate-300 font-medium">{book.title}</td>
                <td className="p-4 text-slate-800 dark:text-slate-300">${book.price}</td>
                <td className="p-4 text-slate-800 dark:text-slate-300">{book.category}</td>
                <td className="p-4">
                  <button className="text-indigo-500 hover:text-indigo-700 mr-4 transition">Edit</button>
                  <button onClick={() => handleDelete(book._id)} className="text-red-500 hover:text-red-700 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageBooks;
