
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/better-auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
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
        const currentUser = await auth.getCurrentUser();
        
        if (currentUser) {
          setUser({
            id: currentUser.id,
            name: currentUser.name || '',
            email: currentUser.email,
            role: currentUser.role as 'admin' | 'user' || 'user',
          });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await auth.signIn(email, password);
      
      if (result.user) {
        const userData = {
          id: result.user.id,
          name: result.user.name || '',
          email: result.user.email,
          role: result.user.role as 'admin' | 'user' || 'user',
        };
        
        setUser(userData);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${userData.name}!`,
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
      const result = await auth.signUp(email, password, {
        name: name,
        role: 'user',
      });
      
      if (result.user) {
        const userData = {
          id: result.user.id,
          name: result.user.name || '',
          email: result.user.email,
          role: result.user.role as 'admin' | 'user' || 'user',
        };
        
        setUser(userData);
        
        toast({
          title: 'Registration successful',
          description: 'Your account has been created successfully!',
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

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully.',
      });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
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
