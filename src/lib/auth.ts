
import { sessionStorage } from './session';
import { dbConnect } from './db';
import type { User } from '@/services/authService';

/**
 * Authentication library for client-side auth operations
 */

export const auth = {
  /**
   * Login a user with email and password
   */
  async login(email: string, password: string) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Store user data in session
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('isLoggedIn', 'true');
      
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  /**
   * Register a new user
   */
  async register(name: string, email: string, password: string) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  /**
   * Log out the current user
   */
  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  },
  
  /**
   * Check if a user is logged in
   */
  isLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  },
  
  /**
   * Get the current user
   */
  getCurrentUser(): User | null {
    const userJson = sessionStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error('Error parsing user JSON:', e);
      return null;
    }
  },
  
  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string) {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send password reset email');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },
  
  /**
   * Reset password with a token
   */
  async resetPassword(token: string, newPassword: string) {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reset password');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },
  
  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>) {
    const user = this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }
      
      const updatedUser = await response.json();
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }
};
