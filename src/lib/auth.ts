
import { sessionStorage } from './session';
import { UserResponse } from '@/types/user';

/**
 * Authentication library for client-side auth operations
 */

export const auth = {
  /**
   * Login a user with email and password
   */
  async login(email: string, password: string) {
    try {
      // In a real app, this would make a fetch request to the login API
      // For demo purposes in browser, we'll use our local API adapter
      const { login } = await import('@/api/auth');
      const userData = await login(email, password);
      
      // Store user data in session
      sessionStorage.setObject('user', userData);
      sessionStorage.setItem('isLoggedIn', 'true');
      
      return userData;
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
      // In a real app, this would make a fetch request to the register API
      const { register } = await import('@/api/auth');
      return await register(name, email, password);
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
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
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
  getCurrentUser(): UserResponse | null {
    return sessionStorage.getObject<UserResponse>('user');
  },
  
  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string) {
    try {
      // In a real app, this would make a fetch request to the forgot-password API
      const { forgotPassword } = await import('@/api/auth');
      return await forgotPassword(email);
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
      // In a real app, this would make a fetch request to the reset-password API
      const { changePassword } = await import('@/api/auth');
      return await changePassword(token, newPassword);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },
  
  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<UserResponse>) {
    const user = this.getCurrentUser();
    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }
    
    try {
      // In a real app, this would make a fetch request to the user update API
      // For our demo, we'll implement this directly
      const { updateUserProfile } = await import('@/services/authService');
      const updatedUser = await updateUserProfile(user.id, updates);
      
      // Update user in session
      sessionStorage.setObject('user', updatedUser);
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },
  
  /**
   * Verify the current session is valid
   */
  async verifySession(): Promise<boolean> {
    const user = this.getCurrentUser();
    if (!user || !user.id) {
      return false;
    }
    
    try {
      // In a real app, this would verify the session with the server
      // For our demo, we'll just check if we have a user
      return true;
    } catch (error) {
      console.error('Session verification error:', error);
      return false;
    }
  }
};
