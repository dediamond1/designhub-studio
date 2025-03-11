
import { dbConnect } from '@/lib/db';
import UserModel from '@/models/User';
import InviteModel from '@/models/Invite';
import { UserDocument, AuthResponse, UserResponse } from '@/types/user';
import * as crypto from 'crypto';

// Helper functions for password management
const hashPassword = async (password: string): Promise<string> => {
  // Simple hash function for demo purposes only
  // In production, use bcrypt or similar
  return crypto.createHash('sha256').update(password).digest('hex');
};

const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const hashedPlainPassword = crypto.createHash('sha256').update(plainPassword).digest('hex');
  return hashedPlainPassword === hashedPassword;
};

// Remove sensitive fields from user object
const sanitizeUser = (user: any): UserResponse => {
  // Create a plain JS object if it's a mongoose document
  const userObj = user.toObject ? user.toObject() : { ...user };
  
  // Remove sensitive fields
  const { password, resetPasswordToken, resetPasswordExpires, verificationToken, __v, ...sanitizedUser } = userObj;
  
  // Ensure id is a string
  if (!sanitizedUser.id && sanitizedUser._id) {
    sanitizedUser.id = sanitizedUser._id.toString();
  }
  
  return sanitizedUser as UserResponse;
};

// Generate a secure random token
const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Register a new user
export const registerUser = async (name: string, email: string, password: string, role: 'admin' | 'user' | 'team-member' = 'user'): Promise<AuthResponse> => {
  try {
    await dbConnect();
    
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Generate verification token
    const verificationToken = generateToken();
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      role,
      verificationToken,
      verified: false,
    });
    
    // Send verification email (mock)
    await sendVerificationEmail(email, name, verificationToken);
    
    return { 
      user: sanitizeUser(newUser), 
      success: true 
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    await dbConnect();
    
    // Find user by email
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Validate password
    const isPasswordValid = await comparePassword(password, user.password as string);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    // Update last login
    user.lastLogin = new Date();
    user.updatedAt = new Date();
    await user.save();
    
    return { 
      user: sanitizeUser(user), 
      success: true 
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Get current user by ID
export const getCurrentUser = async (userId: string): Promise<UserResponse | null> => {
  try {
    await dbConnect();
    
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return null;
    }
    
    return sanitizeUser(user);
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<boolean> => {
  try {
    await dbConnect();
    
    // Find user by email
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      // Don't reveal that email doesn't exist for security
      return false;
    }
    
    // Generate reset token
    const resetToken = generateToken();
    
    // Set token expiry (1 hour)
    const resetPasswordExpires = new Date();
    resetPasswordExpires.setHours(resetPasswordExpires.getHours() + 1);
    
    // Update user with reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    user.updatedAt = new Date();
    await user.save();
    
    // Send password reset email
    await sendPasswordResetEmail(email, user.name, resetToken);
    
    return true;
  } catch (error) {
    console.error("Request password reset error:", error);
    throw error;
  }
};

// Reset password with token
export const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
  try {
    await dbConnect();
    
    // Find user by reset token and check expiry
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    }).exec();
    
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = new Date();
    await user.save();
    
    return true;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

// Verify email with token
export const verifyEmail = async (token: string): Promise<boolean> => {
  try {
    await dbConnect();
    
    // Find user by verification token
    const user = await UserModel.findOne({ verificationToken: token }).exec();
    
    if (!user) {
      throw new Error('Invalid verification token');
    }
    
    // Mark user as verified and remove token
    user.verified = true;
    user.verificationToken = undefined;
    user.updatedAt = new Date();
    await user.save();
    
    return true;
  } catch (error) {
    console.error("Verify email error:", error);
    throw new Error('Invalid or expired verification token');
  }
};

// Invite a team member
export const inviteTeamMember = async (email: string, name: string, role: 'admin' | 'team-member', invitedBy: string): Promise<boolean> => {
  try {
    await dbConnect();
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Check if invite already exists
    const existingInvite = await InviteModel.findOne({ email }).exec();
    if (existingInvite) {
      throw new Error('Invitation has already been sent to this email');
    }
    
    // Generate invite token
    const inviteToken = generateToken();
    
    // Create invitation
    await InviteModel.create({
      email,
      name,
      role,
      invitedBy,
      token: inviteToken,
      createdAt: new Date()
    });
    
    // Send invitation email
    await sendInvitationEmail(email, name, inviteToken);
    
    return true;
  } catch (error) {
    console.error("Invite team member error:", error);
    throw error;
  }
};

// Accept team invitation
export const acceptInvitation = async (token: string, password: string): Promise<AuthResponse> => {
  try {
    await dbConnect();
    
    // Find invitation
    const invitation = await InviteModel.findOne({ token }).exec();
    if (!invitation) {
      throw new Error('Invalid invitation token');
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user from invitation
    const newUser = await UserModel.create({
      email: invitation.email,
      password: hashedPassword,
      name: invitation.name,
      role: invitation.role,
      verified: true
    });
    
    // Delete invitation
    await InviteModel.deleteOne({ token });
    
    return { 
      user: sanitizeUser(newUser), 
      success: true 
    };
  } catch (error) {
    console.error("Accept invitation error:", error);
    throw new Error('Invalid or expired invitation token');
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<UserDocument>): Promise<UserResponse> => {
  try {
    await dbConnect();
    
    // Don't allow updating sensitive fields
    const { password, resetPasswordToken, resetPasswordExpires, verificationToken, role, ...safeUpdates } = updates;
    
    // Add updated timestamp
    safeUpdates.updatedAt = new Date();
    
    // Find and update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: safeUpdates },
      { new: true }
    ).exec();
    
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return sanitizeUser(updatedUser);
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};

// Admin: update user role
export const updateUserRole = async (adminId: string, userId: string, newRole: 'admin' | 'user' | 'team-member'): Promise<UserResponse> => {
  try {
    await dbConnect();
    
    // Verify admin privileges
    const admin = await UserModel.findById(adminId).exec();
    if (!admin || admin.role !== 'admin') {
      throw new Error('Unauthorized: Admin privileges required');
    }
    
    // Find and update user role
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          role: newRole, 
          updatedAt: new Date() 
        } 
      },
      { new: true }
    ).exec();
    
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return sanitizeUser(updatedUser);
  } catch (error) {
    console.error("Update user role error:", error);
    throw error;
  }
};

// Admin: get all users
export const getAllUsers = async (adminId: string): Promise<UserResponse[]> => {
  try {
    await dbConnect();
    
    // Verify admin privileges
    const admin = await UserModel.findById(adminId).exec();
    if (!admin || admin.role !== 'admin') {
      throw new Error('Unauthorized: Admin privileges required');
    }
    
    // Get all users
    const users = await UserModel.find().exec();
    
    // Sanitize all user data
    return users.map(user => sanitizeUser(user));
  } catch (error) {
    console.error("Get all users error:", error);
    throw error;
  }
};

// Admin: delete user
export const deleteUser = async (adminId: string, userId: string): Promise<boolean> => {
  try {
    await dbConnect();
    
    // Verify admin privileges
    const admin = await UserModel.findById(adminId).exec();
    if (!admin || admin.role !== 'admin') {
      throw new Error('Unauthorized: Admin privileges required');
    }
    
    // Don't allow deleting self
    if (adminId === userId) {
      throw new Error('Cannot delete your own account');
    }
    
    // Delete user
    const result = await UserModel.deleteOne({ _id: userId });
    
    return result.deletedCount === 1;
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

// Mock email sending functions
const sendVerificationEmail = async (email: string, name: string, token: string): Promise<void> => {
  try {
    console.log(`[MOCK] Sending verification email to ${email} with token ${token}`);
    // In production, use SendGrid or similar email service
  } catch (error) {
    console.error("Send verification email error:", error);
  }
};

const sendPasswordResetEmail = async (email: string, name: string, token: string): Promise<void> => {
  try {
    console.log(`[MOCK] Sending password reset email to ${email} with token ${token}`);
    // In production, use SendGrid or similar email service
  } catch (error) {
    console.error("Send password reset email error:", error);
  }
};

const sendInvitationEmail = async (email: string, name: string, token: string): Promise<void> => {
  try {
    console.log(`[MOCK] Sending invitation email to ${email} with token ${token}`);
    // In production, use SendGrid or similar email service
  } catch (error) {
    console.error("Send invitation email error:", error);
  }
};
