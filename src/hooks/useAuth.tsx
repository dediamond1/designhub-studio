
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

const API_URL = '/api/auth';

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

  // Register a new user
  const register = useCallback(async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Registration Failed',
          description: data.message || 'Failed to register account',
          variant: 'destructive',
        });
        setLoading(false);
        return { success: false, message: data.message };
      }

      // Store user data and token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUser(data.user);

      toast({
        title: 'Registration Successful',
        description: 'Please check your email to verify your account',
      });
      
      setLoading(false);
      return { success: true, message: data.message };
    } catch (error: any) {
      toast({
        title: 'Registration Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      setLoading(false);
      return { success: false, message: error.message };
    }
  }, [toast]);

  // Login user
  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Login Failed',
          description: data.message || 'Invalid credentials',
          variant: 'destructive',
        });
        setLoading(false);
        return { success: false, message: data.message };
      }

      // Store user data and token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUser(data.user);

      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      
      setLoading(false);
      return { success: true, message: data.message };
    } catch (error: any) {
      toast({
        title: 'Login Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      setLoading(false);
      return { success: false, message: error.message };
    }
  }, [toast]);

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    
    window.location.href = '/login'; // Using direct navigation instead of useNavigate
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  }, [toast]);

  // Request password reset
  const forgotPassword = useCallback(async (data: ResetPasswordRequest) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: 'Request Failed',
          description: result.message || 'Failed to process your request',
          variant: 'destructive',
        });
        setLoading(false);
        return { success: false, message: result.message };
      }

      toast({
        title: 'Request Sent',
        description: 'If your email exists in our system, you will receive password reset instructions',
      });
      
      setLoading(false);
      return { success: true, message: result.message, token: result.resetToken };
    } catch (error: any) {
      toast({
        title: 'Request Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      setLoading(false);
      return { success: false, message: error.message };
    }
  }, [toast]);

  // Reset password with token
  const resetPassword = useCallback(async (data: ChangePasswordRequest) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: 'Password Reset Failed',
          description: result.message || 'Failed to reset your password',
          variant: 'destructive',
        });
        setLoading(false);
        return { success: false, message: result.message };
      }

      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been successfully reset',
      });
      
      setLoading(false);
      return { success: true, message: result.message };
    } catch (error: any) {
      toast({
        title: 'Reset Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      setLoading(false);
      return { success: false, message: error.message };
    }
  }, [toast]);

  // Verify email with token
  const verifyEmail = useCallback(async (data: VerifyEmailRequest) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: 'Verification Failed',
          description: result.message || 'Failed to verify your email',
          variant: 'destructive',
        });
        setLoading(false);
        return { success: false, message: result.message };
      }

      toast({
        title: 'Email Verified',
        description: 'Your email has been successfully verified',
      });
      
      // If the user is logged in, update the verified status
      if (user) {
        const updatedUser = { ...user, verified: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      setLoading(false);
      return { success: true, message: result.message };
    } catch (error: any) {
      toast({
        title: 'Verification Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      setLoading(false);
      return { success: false, message: error.message };
    }
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
