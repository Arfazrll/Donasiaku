import axios from 'axios';
import { setAuthData, logout as clearAuthData } from '../utils/localStorage';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      clearAuthData();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      setAuthData(response.data.data.user);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        (error.response?.data?.errors ? 
                          Object.values(error.response.data.errors).flat().join(', ') : 
                          'Registration failed');
    throw new Error(errorMessage);
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      setAuthData(response.data.data.user);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Invalid credentials';
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    localStorage.removeItem('token');
    clearAuthData();
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me');
    
    if (response.data.success) {
      setAuthData(response.data.data);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get user');
  }
};

export const getUserFromStorage = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const hasRole = (role) => {
  const user = getUserFromStorage();
  return user?.role === role;
};

export const isDonatur = () => {
  return hasRole('donatur');
};

export const isPenerima = () => {
  return hasRole('penerima');
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getUserFromStorage,
  isAuthenticated,
  getToken,
  hasRole,
  isDonatur,
  isPenerima,
};