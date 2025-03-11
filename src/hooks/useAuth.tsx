
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  UserData, 
  ResetPasswordRequest, 
  ChangePasswordRequest, 
  VerifyEmailRequest 
} from '@/types/auth';

// Mock authentication service with localStorage for simplicity
export const useAuthContext = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const { t } = useTranslation();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
    setInitialized(true);
  }, []);

  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = localStorage.getItem(`user_${credentials.email}`);
    if (existingUser) {
      setLoading(false);
      toast.error(t('auth.register.emailExists', 'Email already registered'));
      return { success: false, message: t('auth.register.emailExists', 'Email already registered') };
    }
    
    // Create new user
    const newUser: UserData = {
      id: Date.now().toString(),
      name: credentials.name,
      email: credentials.email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    
    // Store in localStorage
    localStorage.setItem(`user_${credentials.email}`, JSON.stringify({
      ...newUser,
      password: credentials.password // In a real app, this would be hashed
    }));
    
    // Update auth state
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setLoading(false);
    toast.success(t('auth.register.success', 'Registration successful'));
    return { success: true, message: t('auth.register.success', 'Registration successful') };
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    const storedUser = localStorage.getItem(`user_${credentials.email}`);
    if (!storedUser) {
      setLoading(false);
      toast.error(t('auth.login.invalidCredentials', 'Invalid email or password'));
      return { success: false, message: t('auth.login.invalidCredentials', 'Invalid email or password') };
    }
    
    try {
      const userData = JSON.parse(storedUser);
      if (userData.password !== credentials.password) {
        setLoading(false);
        toast.error(t('auth.login.invalidCredentials', 'Invalid email or password'));
        return { success: false, message: t('auth.login.invalidCredentials', 'Invalid email or password') };
      }
      
      // Login successful
      const user: UserData = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user',
        createdAt: userData.createdAt,
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
      setLoading(false);
      toast.success(t('auth.login.success', 'Login successful'));
      return { success: true, message: t('auth.login.success', 'Login successful') };
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      setLoading(false);
      toast.error(t('auth.login.error', 'An error occurred during login'));
      return { success: false, message: t('auth.login.error', 'An error occurred during login') };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success(t('auth.logout.success', 'Logout successful'));
  };

  const forgotPassword = async (data: ResetPasswordRequest) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email exists
    const storedUser = localStorage.getItem(`user_${data.email}`);
    if (!storedUser) {
      setLoading(false);
      // For security reasons, don't reveal if email exists or not
      toast.success(t('auth.forgotPassword.checkEmail', 'If your email is registered, you will receive a password reset link'));
      return { 
        success: true, 
        message: t('auth.forgotPassword.checkEmail', 'If your email is registered, you will receive a password reset link')
      };
    }
    
    // Generate a token (in a real app this would be a secure token)
    const token = Math.random().toString(36).substring(2, 15);
    localStorage.setItem(`reset_token_${data.email}`, token);
    
    setLoading(false);
    toast.success(t('auth.forgotPassword.checkEmail', 'If your email is registered, you will receive a password reset link'));
    return { 
      success: true, 
      message: t('auth.forgotPassword.checkEmail', 'If your email is registered, you will receive a password reset link'),
      token
    };
  };

  const resetPassword = async (data: ChangePasswordRequest) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate token (in a real app this would be more secure)
    const storedToken = localStorage.getItem(`reset_token_${data.email}`);
    if (!storedToken || storedToken !== data.token) {
      setLoading(false);
      toast.error(t('auth.resetPassword.invalidToken', 'Invalid or expired token'));
      return { success: false, message: t('auth.resetPassword.invalidToken', 'Invalid or expired token') };
    }
    
    // Check if user exists
    const storedUser = localStorage.getItem(`user_${data.email}`);
    if (!storedUser) {
      setLoading(false);
      toast.error(t('auth.resetPassword.userNotFound', 'User not found'));
      return { success: false, message: t('auth.resetPassword.userNotFound', 'User not found') };
    }
    
    try {
      // Update password
      const userData = JSON.parse(storedUser);
      userData.password = data.password;
      localStorage.setItem(`user_${data.email}`, JSON.stringify(userData));
      
      // Clean up token
      localStorage.removeItem(`reset_token_${data.email}`);
      
      setLoading(false);
      toast.success(t('auth.resetPassword.success', 'Password reset successful'));
      return { success: true, message: t('auth.resetPassword.success', 'Password reset successful') };
    } catch (error) {
      console.error('Failed to update password:', error);
      setLoading(false);
      toast.error(t('auth.resetPassword.error', 'An error occurred'));
      return { success: false, message: t('auth.resetPassword.error', 'An error occurred') };
    }
  };

  const verifyEmail = async (data: VerifyEmailRequest) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate token (in a real app this would involve JWT validation or similar)
    if (!data.token) {
      setLoading(false);
      toast.error(t('auth.verifyEmail.invalidToken', 'Invalid verification token'));
      return { success: false, message: t('auth.verifyEmail.invalidToken', 'Invalid verification token') };
    }
    
    // In a real app, you would update user's verified status in the database
    // Here we'll just simulate success
    
    setLoading(false);
    toast.success(t('auth.verifyEmail.success', 'Email verified successfully'));
    return { success: true, message: t('auth.verifyEmail.success', 'Email verified successfully') };
  };

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
