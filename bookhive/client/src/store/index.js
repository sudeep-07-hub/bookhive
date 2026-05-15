import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';
import booksReducer from '../features/booksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    books: booksReducer,
  },
});

export default store;

export default store;
