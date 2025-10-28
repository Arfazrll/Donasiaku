import { setAuthData, getAuthData } from '../utils/localStorage';

// Simulasi database users
const USERS_KEY = 'users_db';

const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        reject(new Error('Email sudah terdaftar'));
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      const { password, ...userWithoutPassword } = newUser;
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        reject(new Error('Email atau password salah'));
        return;
      }

      const { password: _, ...userWithoutPassword } = user;
      setAuthData(userWithoutPassword);
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const getCurrentUser = () => {
  return getAuthData();
};