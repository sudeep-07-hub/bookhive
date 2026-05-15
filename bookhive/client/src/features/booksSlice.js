import { createSlice } from '@reduxjs/toolkit';

const mockBooks = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    description: 'A novel about the American dream.',
    price: 15.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    ratings: 4.5,
    numReviews: 12,
    publishedYear: 1925
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    description: 'A novel about racial injustice.',
    price: 12.50,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    ratings: 4.8,
    numReviews: 24,
    publishedYear: 1960
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    description: 'A story of a totalitarian society.',
    price: 14.99,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?auto=format&fit=crop&w=400&q=80',
    ratings: 4.7,
    numReviews: 30,
    publishedYear: 1949
  },
  {
    _id: '4',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    category: 'Programming',
    description: 'Elements of Reusable Object-Oriented Software.',
    price: 45.99,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
    ratings: 4.9,
    numReviews: 100,
    publishedYear: 1994
  }
];

// Provide simulated async action to keep components similar
export const fetchBooks = (keyword = '') => (dispatch) => {
  dispatch(booksSlice.actions.fetchRequest());
  setTimeout(() => {
    const filtered = mockBooks.filter(b => b.title.toLowerCase().includes(keyword.toLowerCase()));
    dispatch(booksSlice.actions.fetchSuccess(filtered));
  }, 500);
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: mockBooks,
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
