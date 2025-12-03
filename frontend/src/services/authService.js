const USERS_KEY = 'users_db';

const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const setAuthData = (userData, token) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('auth_token', token);
  localStorage.setItem('isAuthenticated', 'true');
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
        phone: '',
        avatar: '',
        is_verified: false,
        verification_document: '',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      // eslint-disable-next-line no-unused-vars
      const { password, ...userWithoutPassword } = newUser;
      
      const fakeToken = btoa(JSON.stringify({ userId: newUser.id, timestamp: Date.now() }));
      setAuthData(userWithoutPassword, fakeToken);
      
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const login = async (email, loginPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === loginPassword);

      if (!user) {
        reject(new Error('Email atau password salah'));
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const { password, ...userWithoutPassword } = user;
      
      const fakeToken = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
      setAuthData(userWithoutPassword, fakeToken);
      
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};