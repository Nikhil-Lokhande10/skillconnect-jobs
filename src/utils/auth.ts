// Local storage-based authentication utilities

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  location: string;
  userType: 'customer' | 'worker';
  skills?: string;
  experience?: string;
  serviceArea?: string;
  profilePicture?: string;
  idProof?: string;
  createdAt: string;
}

export const AUTH_STORAGE_KEY = 'skillconnect_auth';
export const USERS_STORAGE_KEY = 'skillconnect_users';

export const saveUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  const existingUser = users.find(u => u.email === userData.email);
  
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const newUser: User = {
    ...userData,
    id: generateUserId(),
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  return newUser;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('User not found');
  }

  // In a real app, you'd verify the hashed password
  // For this demo, we'll just check if password was provided during registration
  const storedPasswords = JSON.parse(localStorage.getItem('skillconnect_passwords') || '{}');
  if (storedPasswords[email] !== password) {
    throw new Error('Invalid password');
  }

  // Set current user
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return user;
};

export const logoutUser = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const getUsers = (): User[] => {
  const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
  return usersStr ? JSON.parse(usersStr) : [];
};

export const savePassword = (email: string, password: string): void => {
  const passwords = JSON.parse(localStorage.getItem('skillconnect_passwords') || '{}');
  passwords[email] = password;
  localStorage.setItem('skillconnect_passwords', JSON.stringify(passwords));
};

const generateUserId = (): string => {
  return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};