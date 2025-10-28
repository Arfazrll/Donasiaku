// Auth Management
export const setAuthData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('isAuthenticated', 'true');
};

export const getAuthData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const getUserRole = () => {
  const user = getAuthData();
  return user ? user.role : null;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
};

// LOGIN FUNCTION - TAMBAHAN INI YANG KURANG
export const login = (userData) => {
  setAuthData(userData);
  return userData;
};

// REGISTER FUNCTION - OPTIONAL TAPI BAGUS UNTUK CONSISTENCY
export const register = (userData) => {
  // Get existing users
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if email already exists
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    createdAt: new Date().toISOString()
  };
  
  // Save to users array
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return newUser;
};

// Donasi Management
export const saveDonasi = (donasi) => {
  const existingDonasi = getDonasi();
  const newDonasi = {
    ...donasi,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  existingDonasi.push(newDonasi);
  localStorage.setItem('donasi', JSON.stringify(existingDonasi));
  return newDonasi;
};

export const getDonasi = () => {
  const donasi = localStorage.getItem('donasi');
  return donasi ? JSON.parse(donasi) : [];
};

export const getDonasiById = (id) => {
  const allDonasi = getDonasi();
  return allDonasi.find(d => d.id === id);
};

export const updateDonasi = (id, updatedData) => {
  const allDonasi = getDonasi();
  const index = allDonasi.findIndex(d => d.id === id);
  if (index !== -1) {
    allDonasi[index] = { ...allDonasi[index], ...updatedData, updatedAt: new Date().toISOString() };
    localStorage.setItem('donasi', JSON.stringify(allDonasi));
    return allDonasi[index];
  }
  return null;
};

export const deleteDonasi = (id) => {
  const allDonasi = getDonasi();
  const filtered = allDonasi.filter(d => d.id !== id);
  localStorage.setItem('donasi', JSON.stringify(filtered));
  return true;
};

export const getDonasiByUserId = (userId) => {
  const allDonasi = getDonasi();
  return allDonasi.filter(d => d.userId === userId);
};