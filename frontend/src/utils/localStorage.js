export const setAuthData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('isAuthenticated', 'true');
};

export const getAuthData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const saveAuthData = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
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
  localStorage.removeItem('auth_token');
  localStorage.removeItem('isAuthenticated');
};

export const getRequests = () => {
  const req = localStorage.getItem('requests_db');
  return req ? JSON.parse(req) : [];
};

export const saveRequest = (request) => {
  const all = getRequests();
  all.push(request);
  localStorage.setItem('requests_db', JSON.stringify(all));
  return request;
};

export const updateRequestStatus = (requestId, status) => {
  const all = getRequests();
  const idx = all.findIndex(r => String(r.id) === String(requestId));
  if (idx !== -1) {
    all[idx].status = status;
    all[idx].updatedAt = new Date().toISOString();
    localStorage.setItem('requests_db', JSON.stringify(all));
    return all[idx];
  }
  return null;
};

export const getRequestsByDonasiIds = (donasiIds = []) => {
  const all = getRequests();
  const ids = donasiIds.map(String);
  return all.filter(r => ids.includes(String(r.donasiId)));
};

export const getMessages = () => {
  const m = localStorage.getItem('messages_db');
  return m ? JSON.parse(m) : [];
};

export const saveMessage = (message) => {
  const all = getMessages();
  all.push(message);
  localStorage.setItem('messages_db', JSON.stringify(all));
  return message;
};

export const getConversationsForUser = (userId) => {
  const all = getMessages();
  const peers = new Map();
  all.forEach((msg) => {
    const other = String(msg.from) === String(userId) ? String(msg.to) : String(msg.from);
    if (!peers.has(other)) peers.set(other, []);
    peers.get(other).push(msg);
  });

  return Array.from(peers.entries()).map(([peerId, msgs]) => ({
    peerId,
    lastMessage: msgs.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt)).slice(-1)[0],
    messages: msgs.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))
  }));
};