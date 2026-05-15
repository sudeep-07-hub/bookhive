import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import toast from 'react-hot-toast';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ book: book._id, quantity: 1, ...book }));
    toast.success(`${book.title} added to cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/books/${book._id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-white dark:bg-slate-800 text-xs font-bold px-2 py-1 rounded-full shadow">
            ${book.price}
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs text-primary-500 font-semibold uppercase tracking-wider mb-1">
            {book.category}
          </p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate">
            {book.author}
          </p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-sm font-medium">{book.ratings}</span>
              <span className="text-xs text-gray-500 ml-1">({book.numReviews})</span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white dark:bg-slate-700 dark:text-primary-400 dark:hover:bg-primary-600 dark:hover:text-white p-2 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
