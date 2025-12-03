import { authAPI } from './api';

const setAuthData = (userData, token) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('auth_token', token);
  localStorage.setItem('isAuthenticated', 'true');
};

const clearAuthData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('isAuthenticated');
};

export const register = async (userData) => {
  try {
    const response = await authAPI.register({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      phone: userData.phone || '',
    });

    const { user, token } = response.data.data;
    setAuthData(user, token);
    
    return user;
  } catch (error) {
    const message = error.response?.data?.message || 'Registrasi gagal';
    throw new Error(message);
  }
};

export const login = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    
    const { user, token } = response.data.data;
    setAuthData(user, token);
    
    return user;
  } catch (error) {
    const message = error.response?.data?.message || 'Login gagal';
    throw new Error(message);
  }
};

export const logout = async () => {
  try {
    await authAPI.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearAuthData();
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};