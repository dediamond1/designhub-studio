
import { dbConnect } from '@/lib/db';
import { 
  loginUser, 
  registerUser, 
  getCurrentUser, 
  requestPasswordReset,
  resetPassword,
  verifyEmail,
  inviteTeamMember,
  acceptInvitation,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '@/services/authService';

// These functions are adapters for our API routes
// They bridge between the API layer and our service layer
// In a browser environment, these would call fetch to the backend
// But for demo purposes, they directly access the service layer

// User login
export const login = async (email: string, password: string) => {
  try {
    return await loginUser(email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// User registration
export const register = async (name: string, email: string, password: string) => {
  try {
    return await registerUser(name, email, password);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Get current user
export const getUser = async (userId: string) => {
  try {
    return await getCurrentUser(userId);
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

// Request password reset
export const forgotPassword = async (email: string) => {
  try {
    return await requestPasswordReset(email);
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

// Reset password with token
export const changePassword = async (token: string, newPassword: string) => {
  try {
    return await resetPassword(token, newPassword);
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

// Verify email address
export const verifyUserEmail = async (token: string) => {
  try {
    return await verifyEmail(token);
  } catch (error) {
    console.error("Verify email error:", error);
    throw error;
  }
};

// Admin: Get all users
export const getUsers = async (adminId: string) => {
  try {
    return await getAllUsers(adminId);
  } catch (error) {
    console.error("Get users error:", error);
    throw error;
  }
};

// Admin: Update user role
export const updateRole = async (adminId: string, userId: string, role: 'admin' | 'user' | 'team-member') => {
  try {
    return await updateUserRole(adminId, userId, role);
  } catch (error) {
    console.error("Update role error:", error);
    throw error;
  }
};

// Admin: Delete user
export const removeUser = async (adminId: string, userId: string) => {
  try {
    return await deleteUser(adminId, userId);
  } catch (error) {
    console.error("Remove user error:", error);
    throw error;
  }
};

// Admin: Invite team member
export const invite = async (adminId: string, email: string, name: string, role: 'admin' | 'team-member') => {
  try {
    return await inviteTeamMember(email, name, role, adminId);
  } catch (error) {
    console.error("Invite error:", error);
    throw error;
  }
};

// Accept invitation
export const acceptTeamInvitation = async (token: string, password: string) => {
  try {
    return await acceptInvitation(token, password);
  } catch (error) {
    console.error("Accept invitation error:", error);
    throw error;
  }
};
