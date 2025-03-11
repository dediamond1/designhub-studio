
import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  UserData, 
  ResetPasswordRequest, 
  ChangePasswordRequest, 
  VerifyEmailRequest 
} from '@/types/auth';

export const useAuthContext = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);
  const { toast } = useToast();

  // Initialize authentication state from local storage
  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          // Handle invalid JSON
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
      setInitialized(true);
    };

    initAuth();
  }, []);

  // Register a new user (mock functionality)
  const register = useCallback(async (credentials: RegisterCredentials) => {
    setLoading(true);
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock user
    const mockUser: UserData = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: credentials.name,
      email: credentials.email,
      role: 'user',
      verified: false
    };
    
    // Store user data and token
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock_token_' + Date.now());
    setUser(mockUser);
    
    toast({
      title: 'Registration Successful',
      description: 'Please check your email to verify your account',
    });
    
    setLoading(false);
    return { success: true, message: 'Registration successful!' };
  }, [toast]);

  // Login user (mock functionality)
  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Always succeed in this mock version
    const mockUser: UserData = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Demo User',
      email: credentials.email,
      role: 'admin',
      verified: true
    };
    
    // Store user data and token
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock_token_' + Date.now());
    setUser(mockUser);
    
    toast({
      title: 'Login Successful',
      description: 'Welcome back!',
    });
    
    setLoading(false);
    return { success: true, message: 'Login successful!' };
  }, [toast]);

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  }, [toast]);

  // Request password reset (mock functionality)
  const forgotPassword = useCallback(async (data: ResetPasswordRequest) => {
    setLoading(true);
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Request Sent',
      description: 'If your email exists in our system, you will receive password reset instructions',
    });
    
    setLoading(false);
    return { 
      success: true, 
      message: 'Password reset link sent!', 
      token: 'mock_reset_token_' + Date.now() 
    };
  }, [toast]);

  // Reset password with token (mock functionality)
  const resetPassword = useCallback(async (data: ChangePasswordRequest) => {
    setLoading(true);
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Password Reset Successful',
      description: 'Your password has been successfully reset',
    });
    
    setLoading(false);
    return { success: true, message: 'Password reset successful!' };
  }, [toast]);

  // Verify email with token (mock functionality)
  const verifyEmail = useCallback(async (data: VerifyEmailRequest) => {
    setLoading(true);
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If the user is logged in, update the verified status
    if (user) {
      const updatedUser = { ...user, verified: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    
    toast({
      title: 'Email Verified',
      description: 'Your email has been successfully verified',
    });
    
    setLoading(false);
    return { success: true, message: 'Email verification successful!' };
  }, [toast, user]);

  return {
    user,
    loading,
    initialized,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail
  };
};
