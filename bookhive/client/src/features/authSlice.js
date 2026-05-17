import { createSlice } from '@reduxjs/toolkit';
import api from './api';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(authSlice.actions.authRequest());
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(authSlice.actions.authSuccess(data));
    return { payload: data, type: 'auth/login/fulfilled' };
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(authSlice.actions.authFail(message));
    return { payload: message, type: 'auth/login/rejected' };
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch(authSlice.actions.authRequest());
    const { data } = await api.post('/api/auth/register', { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(authSlice.actions.authSuccess(data));
    return { payload: data, type: 'auth/register/fulfilled' };
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(authSlice.actions.authFail(message));
    return { payload: message, type: 'auth/register/rejected' };
  }
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

login.fulfilled = { match: (action) => action.type?.endsWith('fulfilled') };
register.fulfilled = { match: (action) => action.type?.endsWith('fulfilled') };

export const { logout } = authSlice.actions;
export default authSlice.reducer;
