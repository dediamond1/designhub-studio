
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthContext as useAuth } from '@/hooks/useAuth';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  UserData, 
  ResetPasswordRequest, 
  ChangePasswordRequest, 
  VerifyEmailRequest 
} from '@/types/auth';

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  initialized: boolean;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; message: string }>;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  forgotPassword: (data: ResetPasswordRequest) => Promise<{ success: boolean; message: string; token?: string }>;
  resetPassword: (data: ChangePasswordRequest) => Promise<{ success: boolean; message: string }>;
  verifyEmail: (data: VerifyEmailRequest) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
