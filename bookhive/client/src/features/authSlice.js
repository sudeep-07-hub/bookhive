import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Simulated async actions
export const login = ({ email, password }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(authSlice.actions.authRequest());
    setTimeout(() => {
      // Dummy check
      if (email && password) {
        const mockUser = {
          _id: 'user_123',
          name: email.split('@')[0],
          email,
          role: email.includes('admin') ? 'Admin' : 'User',
          token: 'dummy-jwt-token'
        };
        localStorage.setItem('userInfo', JSON.stringify(mockUser));
        dispatch(authSlice.actions.authSuccess(mockUser));
        resolve({ payload: mockUser, type: 'auth/login/fulfilled' }); // Mock Redux Thunk fulfilled object structure
      } else {
        dispatch(authSlice.actions.authFail('Invalid credentials'));
        resolve({ payload: 'Invalid credentials', type: 'auth/login/rejected' }); 
      }
    }, 800);
  });
};

export const register = ({ name, email, password }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(authSlice.actions.authRequest());
    setTimeout(() => {
      if (email && password && name) {
        const mockUser = {
          _id: 'user_123' + Math.floor(Math.random() * 1000),
          name,
          email,
          role: 'User',
          token: 'dummy-jwt-token'
        };
        localStorage.setItem('userInfo', JSON.stringify(mockUser));
        dispatch(authSlice.actions.authSuccess(mockUser));
        resolve({ payload: mockUser, type: 'auth/register/fulfilled' });
      } else {
        dispatch(authSlice.actions.authFail('Missing details'));
        resolve({ payload: 'Missing details', type: 'auth/register/rejected' });
      }
    }, 800);
  });
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    },
  },
});

// Since components check if login.fulfilled.match(action), we need a dummy match function on our exported login action for compat
login.fulfilled = { match: (action) => action.type?.endsWith('fulfilled') };
register.fulfilled = { match: (action) => action.type?.endsWith('fulfilled') };

export const { logout } = authSlice.actions;
export default authSlice.reducer;
