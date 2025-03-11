
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';
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

// User login
export const login = async (email: string, password: string) => {
  return await loginUser(email, password);
};

// User registration
export const register = async (name: string, email: string, password: string) => {
  return await registerUser(name, email, password);
};

// Get current user
export const getUser = async (userId: string) => {
  return await getCurrentUser(userId);
};

// Request password reset
export const forgotPassword = async (email: string) => {
  return await requestPasswordReset(email);
};

// Reset password with token
export const changePassword = async (token: string, newPassword: string) => {
  return await resetPassword(token, newPassword);
};

// Verify email address
export const verifyUserEmail = async (token: string) => {
  return await verifyEmail(token);
};

// Admin: Get all users
export const getUsers = async (adminId: string) => {
  return await getAllUsers(adminId);
};

// Admin: Update user role
export const updateRole = async (adminId: string, userId: string, role: 'admin' | 'user' | 'team-member') => {
  return await updateUserRole(adminId, userId, role);
};

// Admin: Delete user
export const removeUser = async (adminId: string, userId: string) => {
  return await deleteUser(adminId, userId);
};

// Admin: Invite team member
export const invite = async (adminId: string, email: string, name: string, role: 'admin' | 'team-member') => {
  return await inviteTeamMember(email, name, role, adminId);
};

// Accept invitation
export const acceptTeamInvitation = async (token: string, password: string) => {
  return await acceptInvitation(token, password);
};
