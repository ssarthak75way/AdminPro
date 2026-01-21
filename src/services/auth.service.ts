/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from '../store/authSlice';

// Helper to get users from localStorage
const getStoredUsers = (): Record<string, User & { password: string }> => {
  const users = localStorage.getItem('registered_users');
  return users ? JSON.parse(users) : {};
};

// Helper to save user to localStorage
const saveUser = (user: User, password: string) => {
  const users = getStoredUsers();
  users[user.email] = { ...user, password };
  localStorage.setItem('registered_users', JSON.stringify(users));
};

// Mock user database
const MOCK_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
};

const MOCK_TOKEN = 'mock-jwt-token-12345';

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check hardcoded admin first
        if (email === 'admin@example.com' && password === 'password') {
          resolve({
            user: MOCK_USER,
            token: MOCK_TOKEN,
          });
          return;
        }

        // Check stored users
        const storedUsers = getStoredUsers();
        const storedUser = storedUsers[email];

        if (storedUser && storedUser.password === password) {
          const { password: _, ...userWithoutPassword } = storedUser;
          resolve({
            user: userWithoutPassword,
            token: MOCK_TOKEN + '-' + storedUser.id,
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800); // Simulate network delay
    });
  },

  register: async (email: string, password: string, name: string): Promise<{ user: User; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = getStoredUsers();
        if (storedUsers[email]) {
          reject(new Error('User already exists'));
          return;
        }

        const newUser: User = { id: Date.now().toString(), email, name };
        saveUser(newUser, password);

        resolve({
          user: newUser,
          token: MOCK_TOKEN + '-' + newUser.id,
        });
      }, 800);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },
};
