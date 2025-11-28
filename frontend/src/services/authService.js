import axios from 'axios';
import { setAuthData, logout as clearAuthData } from '../utils/localStorage';

const API_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add token to requests
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

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and redirect to login
      localStorage.removeItem('token');
      clearAuthData();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Register new user (Donatur or Penerima)
 * @param {Object} userData - { name, email, password, role, phone? }
 * @returns {Promise<Object>} User data and token
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    
    if (response.data.success) {
      // Save token and user to localStorage
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

/**
 * Login user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User data and token
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    
    if (response.data.success) {
      // Save token and user to localStorage
      localStorage.setItem('token', response.data.data.token);
      setAuthData(response.data.data.user);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Invalid credentials';
    throw new Error(errorMessage);
  }
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // Always clear local data even if API call fails
    localStorage.removeItem('token');
    clearAuthData();
  }
};

/**
 * Get current authenticated user from API
 * @returns {Promise<Object>} User data
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me');
    
    if (response.data.success) {
      // Update user in localStorage
      setAuthData(response.data.data);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get user');
  }
};

/**
 * Get user from localStorage (synchronous)
 * @returns {Object|null} User object or null
 */
export const getUserFromStorage = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Get token from localStorage
 * @returns {string|null} Token or null
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check user role
 * @param {string} role - Role to check (donatur or penerima)
 * @returns {boolean} True if user has the role
 */
export const hasRole = (role) => {
  const user = getUserFromStorage();
  return user?.role === role;
};

/**
 * Check if user is donatur
 * @returns {boolean} True if user is donatur
 */
export const isDonatur = () => {
  return hasRole('donatur');
};

/**
 * Check if user is penerima
 * @returns {boolean} True if user is penerima
 */
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