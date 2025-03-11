
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  loginUser, 
  registerUser, 
  getCurrentUser, 
  requestPasswordReset, 
  resetPassword,
  verifyEmail,
  inviteTeamMember,
  acceptInvitation,
  updateUserProfile,
  User
} from '@/services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  inviteTeamMember: (email: string, name: string, role: 'admin' | 'team-member') => Promise<boolean>;
  acceptInvitation: (token: string, password: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<User>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          const currentUser = await getCurrentUser(token);
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      
      if (result.user) {
        setUser(result.user);
        
        // Store token in localStorage
        localStorage.setItem('auth_token', result.token);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${result.user.name}!`,
        });
        
        // Redirect to the page they were trying to access or dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const result = await registerUser(name, email, password);
      
      if (result.user) {
        setUser(result.user);
        
        // Store token in localStorage
        localStorage.setItem('auth_token', result.token);
        
        toast({
          title: 'Registration successful',
          description: 'Your account has been created successfully! Please check your email to verify your account.',
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const result = await requestPasswordReset(email);
      
      if (result) {
        toast({
          title: 'Password reset email sent',
          description: 'If an account with that email exists, we have sent a password reset link.',
        });
      } else {
        // Silent success even if email doesn't exist (security)
        toast({
          title: 'Password reset email sent',
          description: 'If an account with that email exists, we have sent a password reset link.',
        });
      }
      
      return true;
    } catch (error) {
      console.error('Password reset request failed:', error);
      toast({
        title: 'Request failed',
        description: 'An error occurred while processing your request',
        variant: 'destructive',
      });
      return false;
    }
  };

  const resetPasswordHandler = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      const result = await resetPassword(token, newPassword);
      
      if (result) {
        toast({
          title: 'Password reset successful',
          description: 'Your password has been reset successfully. You can now login with your new password.',
        });
        navigate('/login');
      }
      
      return true;
    } catch (error) {
      console.error('Password reset failed:', error);
      toast({
        title: 'Password reset failed',
        description: error instanceof Error ? error.message : 'An error occurred during password reset',
        variant: 'destructive',
      });
      return false;
    }
  };

  const verifyEmailHandler = async (token: string): Promise<boolean> => {
    try {
      const result = await verifyEmail(token);
      
      if (result) {
        toast({
          title: 'Email verified',
          description: 'Your email has been verified successfully.',
        });
      }
      
      return true;
    } catch (error) {
      console.error('Email verification failed:', error);
      toast({
        title: 'Verification failed',
        description: error instanceof Error ? error.message : 'An error occurred during email verification',
        variant: 'destructive',
      });
      return false;
    }
  };

  const inviteTeamMemberHandler = async (email: string, name: string, role: 'admin' | 'team-member'): Promise<boolean> => {
    try {
      if (!user?.id) {
        throw new Error('You must be logged in to invite team members');
      }
      
      const result = await inviteTeamMember(email, name, role, user.id);
      
      if (result) {
        toast({
          title: 'Invitation sent',
          description: `An invitation has been sent to ${email}`,
        });
      }
      
      return true;
    } catch (error) {
      console.error('Team member invitation failed:', error);
      toast({
        title: 'Invitation failed',
        description: error instanceof Error ? error.message : 'An error occurred while sending the invitation',
        variant: 'destructive',
      });
      return false;
    }
  };

  const acceptInvitationHandler = async (token: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const result = await acceptInvitation(token, password);
      
      if (result.user) {
        setUser(result.user);
        
        // Store token in localStorage
        localStorage.setItem('auth_token', result.token);
        
        toast({
          title: 'Invitation accepted',
          description: `Welcome to Kalmar Studio, ${result.user.name}!`,
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Invitation acceptance failed:', error);
      toast({
        title: 'Invitation failed',
        description: error instanceof Error ? error.message : 'An error occurred while accepting the invitation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<User> => {
    try {
      if (!user?.id) {
        throw new Error('You must be logged in to update your profile');
      }
      
      const updatedUser = await updateUserProfile(user.id, updates);
      
      setUser(updatedUser);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'An error occurred while updating your profile',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword: resetPasswordHandler,
        verifyEmail: verifyEmailHandler,
        inviteTeamMember: inviteTeamMemberHandler,
        acceptInvitation: acceptInvitationHandler,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
