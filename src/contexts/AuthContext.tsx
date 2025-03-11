
import React, { createContext, useContext, useState } from 'react';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Define AuthContext type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user
const mockUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'admin'
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser); // Set to mock user for demo purposes

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    console.log('Mock login with:', email, password);
    setUser(mockUser);
  };

  const logout = async () => {
    console.log('Mock logout');
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    console.log('Mock register with:', name, email, password);
    setUser(mockUser);
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
