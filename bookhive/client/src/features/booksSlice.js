import { createSlice } from '@reduxjs/toolkit';
import api from './api';

export const fetchBooks = (keyword = '') => async (dispatch) => {
  try {
    dispatch(booksSlice.actions.fetchRequest());
    const { data } = await api.get(`/api/books?keyword=${keyword}`);
    dispatch(booksSlice.actions.fetchSuccess(data));
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(booksSlice.actions.fetchFail(message));
  }
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export default booksSlice.reducer;
