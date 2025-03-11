
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';
import * as crypto from 'crypto';

// Define User interface
export interface User {
  _id?: string | ObjectId;
  id: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'user' | 'team-member';
  createdAt?: Date;
  updatedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  verified?: boolean;
  lastLogin?: Date;
}

export interface AuthResponse {
  user: Omit<User, 'password' | 'resetPasswordToken' | 'resetPasswordExpires' | 'verificationToken'>;
  success: boolean;
  message?: string;
}

// Mock password hashing functions
const hashPassword = async (password: string): Promise<string> => {
  // In browser environment, we can't use bcrypt
  // This is a simplified hash for demonstration purposes only
  // In a real application, NEVER use this approach!
  return crypto.createHash('sha256').update(password).digest('hex');
};

const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  // Again, this is only for demonstration
  const hashedPlainPassword = crypto.createHash('sha256').update(plainPassword).digest('hex');
  return hashedPlainPassword === hashedPassword;
};

// User sanitization (remove sensitive fields)
const sanitizeUser = (user: any): Omit<User, 'password' | 'resetPasswordToken' | 'resetPasswordExpires' | 'verificationToken'> => {
  const { password, resetPasswordToken, resetPasswordExpires, verificationToken, ...sanitizedUser } = user;
  
  // Convert MongoDB ObjectId to string
  if (sanitizedUser._id instanceof ObjectId) {
    sanitizedUser.id = sanitizedUser._id.toString();
  } else if (typeof sanitizedUser._id === 'string') {
    sanitizedUser.id = sanitizedUser._id;
  } else if (sanitizedUser._id) {
    sanitizedUser.id = sanitizedUser._id.toString();
  }
  
  return sanitizedUser;
};

// Generate a random token
const generateToken = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

// Register a new user
export const registerUser = async (name: string, email: string, password: string, role: 'admin' | 'user' | 'team-member' = 'user'): Promise<AuthResponse> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Check if email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Generate verification token
    const verificationToken = generateToken();
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const newUser = {
      email,
      password: hashedPassword,
      name,
      role,
      verificationToken,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(newUser);
    const insertedUser = {
      ...newUser,
      _id: result.insertedId,
      id: result.insertedId.toString()
    };
    
    // Send verification email
    await sendVerificationEmail(email, name, verificationToken);
    
    return { user: sanitizeUser(insertedUser), success: true };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Validate password
    const isPasswordValid = await comparePassword(password, user.password as string);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    // Update last login
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date(), updatedAt: new Date() } }
    );

    // Ensure user has an id field
    const userWithId = {
      ...user,
      id: user._id.toString()
    };
    
    return { user: sanitizeUser(userWithId), success: true };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (userId: string): Promise<User | null> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return null;
    }
    
    return sanitizeUser({
      ...user,
      id: user._id.toString()
    });
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<boolean> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      // Don't reveal that email doesn't exist
      return false;
    }
    
    // Generate reset token
    const resetToken = generateToken();
    
    // Update user with reset token and expiry
    const resetPasswordExpires = new Date();
    resetPasswordExpires.setHours(resetPasswordExpires.getHours() + 1); // 1 hour expiry
    
    await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { 
          resetPasswordToken: resetToken, 
          resetPasswordExpires, 
          updatedAt: new Date() 
        } 
      }
    );
    
    // Send password reset email
    await sendPasswordResetEmail(email, user.name, resetToken);
    
    return true;
  } catch (error) {
    console.error("Request password reset error:", error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Find user by reset token and check expiry
    const user = await usersCollection.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });
    
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update user with new password and clear reset token
    await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        },
        $unset: { 
          resetPasswordToken: "",
          resetPasswordExpires: ""
        }
      }
    );
    
    return true;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

// Verify email
export const verifyEmail = async (token: string): Promise<boolean> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Find user by verification token
    const user = await usersCollection.findOne({
      verificationToken: token
    });
    
    if (!user) {
      throw new Error('Invalid verification token');
    }
    
    // Update user as verified
    await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { 
          verified: true,
          updatedAt: new Date()
        },
        $unset: { verificationToken: "" }
      }
    );
    
    return true;
  } catch (error) {
    console.error("Verify email error:", error);
    throw new Error('Invalid or expired verification token');
  }
};

// Invite team member
export const inviteTeamMember = async (email: string, name: string, role: 'admin' | 'team-member', invitedBy: string): Promise<boolean> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    const invitesCollection = db.collection('invites');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Check if invite already exists
    const existingInvite = await invitesCollection.findOne({ email });
    if (existingInvite) {
      throw new Error('Invitation has already been sent to this email');
    }
    
    // Generate invite token
    const inviteToken = generateToken();
    
    // Store invitation
    await invitesCollection.insertOne({
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
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    const invitesCollection = db.collection('invites');
    
    // Find invitation
    const invitation = await invitesCollection.findOne({ token });
    if (!invitation) {
      throw new Error('Invalid invitation token');
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const newUser = {
      email: invitation.email,
      password: hashedPassword,
      name: invitation.name,
      role: invitation.role,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(newUser);
    const insertedUser = {
      ...newUser,
      _id: result.insertedId,
      id: result.insertedId.toString()
    };
    
    // Delete invitation
    await invitesCollection.deleteOne({ token });
    
    return { user: sanitizeUser(insertedUser), success: true };
  } catch (error) {
    console.error("Accept invitation error:", error);
    throw new Error('Invalid or expired invitation token');
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<User> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Don't allow updating sensitive fields
    const { password, resetPasswordToken, resetPasswordExpires, verificationToken, role, ...safeUpdates } = updates;
    
    // Add updated timestamp
    safeUpdates.updatedAt = new Date();
    
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: safeUpdates }
    );
    
    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return sanitizeUser({
      ...updatedUser,
      id: updatedUser._id.toString()
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};

// Admin: update user role
export const updateUserRole = async (adminId: string, userId: string, newRole: 'admin' | 'user' | 'team-member'): Promise<User> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Verify admin
    const admin = await usersCollection.findOne({ _id: new ObjectId(adminId) });
    if (!admin || admin.role !== 'admin') {
      throw new Error('Unauthorized: Admin privileges required');
    }
    
    // Update user role
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole, updatedAt: new Date() } }
    );
    
    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return sanitizeUser({
      ...updatedUser,
      id: updatedUser._id.toString()
    });
  } catch (error) {
    console.error("Update user role error:", error);
    throw error;
  }
};

// Admin: get all users
export const getAllUsers = async (adminId: string): Promise<User[]> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Verify admin
    const admin = await usersCollection.findOne({ _id: new ObjectId(adminId) });
    if (!admin || admin.role !== 'admin') {
      throw new Error('Unauthorized: Admin privileges required');
    }
    
    const users = await usersCollection.find().toArray();
    
    // Sanitize all users
    return users.map(user => sanitizeUser({
      ...user,
      id: user._id.toString()
    }));
  } catch (error) {
    console.error("Get all users error:", error);
    throw error;
  }
};

// Admin: delete user
export const deleteUser = async (adminId: string, userId: string): Promise<boolean> => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');
    
    // Verify admin
    const admin = await usersCollection.findOne({ _id: new ObjectId(adminId) });
    if (!admin || admin.role !== 'admin') {
      throw new Error('Unauthorized: Admin privileges required');
    }
    
    // Don't allow deleting self
    if (adminId === userId) {
      throw new Error('Cannot delete your own account');
    }
    
    const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
    
    return result.deletedCount === 1;
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

// Helper email functions - mocked for browser environment
const sendVerificationEmail = async (email: string, name: string, token: string): Promise<void> => {
  try {
    console.log(`[MOCK] Sending verification email to ${email} with token ${token}`);
    // In a real application, this would send an actual email
  } catch (error) {
    console.error("Send verification email error:", error);
  }
};

const sendPasswordResetEmail = async (email: string, name: string, token: string): Promise<void> => {
  try {
    console.log(`[MOCK] Sending password reset email to ${email} with token ${token}`);
    // In a real application, this would send an actual email
  } catch (error) {
    console.error("Send password reset email error:", error);
  }
};

const sendInvitationEmail = async (email: string, name: string, token: string): Promise<void> => {
  try {
    console.log(`[MOCK] Sending invitation email to ${email} with token ${token}`);
    // In a real application, this would send an actual email
  } catch (error) {
    console.error("Send invitation email error:", error);
  }
};
