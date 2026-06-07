// ShopHub - Authentication Module

const AUTH_CURRENT_USER_KEY = 'shophub_current_user';

function getCurrentUser() {
  const userId = localStorage.getItem(AUTH_CURRENT_USER_KEY);
  if (!userId) return null;
  const users = JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
  return users.find(u => u.id === userId) || null;
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function hasRole(role) {
  const user = getCurrentUser();
  return user && user.role === role;
}

function login(email, password) {
  const users = JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    localStorage.setItem(AUTH_CURRENT_USER_KEY, user.id);
    return { success: true, user };
  }
  return { success: false, message: 'Invalid email or password.' };
}

function register(userData) {
  const users = JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
  if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, message: 'An account with this email already exists.' };
  }
  const newUser = {
    id: 'user_' + Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'customer',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=2563EB&color=fff`,
    phone: userData.phone || '',
    address: { street: '', city: '', province: '', zip: '', country: 'Philippines' },
    createdAt: new Date().toISOString(),
    sellerId: null
  };
  users.push(newUser);
  localStorage.setItem(SHOPHUB_USERS_KEY, JSON.stringify(users));
  localStorage.setItem(AUTH_CURRENT_USER_KEY, newUser.id);
  return { success: true, user: newUser };
}

function logout() {
  localStorage.removeItem(AUTH_CURRENT_USER_KEY);
  window.location.href = 'index.html';
}

function requireAuth(redirectTo) {
  if (!isLoggedIn()) {
    const target = redirectTo || window.location.href;
    window.location.href = 'login.html?redirect=' + encodeURIComponent(target);
    return false;
  }
  return true;
}

function requireRole(role, redirectTo) {
  if (!hasRole(role)) {
    window.location.href = redirectTo || 'index.html';
    return false;
  }
  return true;
}

function updateProfile(updatedData) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Not logged in.' };
  const users = JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
  const idx = users.findIndex(u => u.id === user.id);
  if (idx === -1) return { success: false, message: 'User not found.' };
  const allowedFields = ['name', 'phone', 'address', 'avatar'];
  allowedFields.forEach(f => { if (updatedData[f] !== undefined) users[idx][f] = updatedData[f]; });
  if (updatedData.password && updatedData.newPassword) {
    if (users[idx].password !== updatedData.password) return { success: false, message: 'Current password is incorrect.' };
    users[idx].password = updatedData.newPassword;
  }
  users[idx].avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(users[idx].name)}&background=2563EB&color=fff`;
  localStorage.setItem(SHOPHUB_USERS_KEY, JSON.stringify(users));
  return { success: true, user: users[idx] };
}

function getAllUsers() {
  return JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
}

function getUserById(id) {
  const users = JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
  return users.find(u => u.id === id) || null;
}

function deleteUser(id) {
  const users = JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
  const filtered = users.filter(u => u.id !== id);
  localStorage.setItem(SHOPHUB_USERS_KEY, JSON.stringify(filtered));
}

function becomeseller(storeName) {
  const user = getCurrentUser();
  if (!user) return { success: false };
  const users = JSON.parse(localStorage.getItem(SHOPHUB_USERS_KEY) || '[]');
  const idx = users.findIndex(u => u.id === user.id);
  const sellers = getSellers();
  const newSeller = {
    id: Date.now(),
    name: storeName,
    email: user.email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(storeName)}&background=2563EB&color=fff`,
    rating: 0, totalSales: 0, followers: 0,
    joinedDate: new Date().toISOString().split('T')[0],
    location: user.address ? `${user.address.city}, ${user.address.province}` : 'Philippines',
    responseTime: 'within 24 hours',
    description: 'Welcome to my store!',
    verified: false, productCount: 0
  };
  sellers.push(newSeller);
  localStorage.setItem('shophub_sellers', JSON.stringify(sellers));
  users[idx].role = 'seller';
  users[idx].sellerId = newSeller.id;
  localStorage.setItem(SHOPHUB_USERS_KEY, JSON.stringify(users));
  localStorage.setItem(AUTH_CURRENT_USER_KEY, users[idx].id);
  return { success: true, seller: newSeller };
}

function getSellers() {
  const stored = localStorage.getItem('shophub_sellers');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('shophub_sellers', JSON.stringify(DEMO_SELLERS));
  return DEMO_SELLERS;
}

function getSellerById(id) {
  return getSellers().find(s => s.id == id) || null;
}
