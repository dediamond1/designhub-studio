
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { dbConnect } from '@/lib/db';
import { sendEmail } from './emailService';
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
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Register a new user
export const registerUser = async (name: string, email: string, password: string, role: 'admin' | 'user' | 'team-member' = 'user'): Promise<AuthResponse> => {
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
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
};

// Login user
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { db } = await dbConnect();
  const usersCollection = db.collection('users');
  
  // Find user by email
  const user = await usersCollection.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password as string);
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
    return null;
  }
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<boolean> => {
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
};

// Reset password
export const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
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
};

// Verify email
export const verifyEmail = async (token: string): Promise<boolean> => {
  const { db } = await dbConnect();
  const usersCollection = db.collection('users');
  
  try {
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
    throw new Error('Invalid or expired verification token');
  }
};

// Invite team member
export const inviteTeamMember = async (email: string, name: string, role: 'admin' | 'team-member', invitedBy: string): Promise<boolean> => {
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
};

// Accept team invitation
export const acceptInvitation = async (token: string, password: string): Promise<AuthResponse> => {
  const { db } = await dbConnect();
  const usersCollection = db.collection('users');
  const invitesCollection = db.collection('invites');
  
  try {
    // Find invitation
    const invitation = await invitesCollection.findOne({ token });
    if (!invitation) {
      throw new Error('Invalid invitation token');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
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
    throw new Error('Invalid or expired invitation token');
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<User> => {
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
};

// Admin: update user role
export const updateUserRole = async (adminId: string, userId: string, newRole: 'admin' | 'user' | 'team-member'): Promise<User> => {
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
};

// Admin: get all users
export const getAllUsers = async (adminId: string): Promise<User[]> => {
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
};

// Admin: delete user
export const deleteUser = async (adminId: string, userId: string): Promise<boolean> => {
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
};

// Helper email functions
const sendVerificationEmail = async (email: string, name: string, token: string) => {
  const subject = 'Verify Your Email - Kalmar Studio';
  const verificationUrl = `${process.env.APP_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Welcome to Kalmar Studio!</h2>
      <p>Hello ${name},</p>
      <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
      </div>
      <p>If you didn't create this account, please ignore this email.</p>
      <p>Thanks,<br>The Kalmar Studio Team</p>
    </div>
  `;
  
  await sendEmail(email, subject, html);
};

const sendPasswordResetEmail = async (email: string, name: string, token: string) => {
  const subject = 'Reset Your Password - Kalmar Studio';
  const resetUrl = `${process.env.APP_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Password Reset Request</h2>
      <p>Hello ${name},</p>
      <p>You requested a password reset. Click the button below to set a new password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
      <p>This link will expire in 1 hour.</p>
      <p>Thanks,<br>The Kalmar Studio Team</p>
    </div>
  `;
  
  await sendEmail(email, subject, html);
};

const sendInvitationEmail = async (email: string, name: string, token: string) => {
  const subject = 'You\'re Invited to Join Kalmar Studio';
  const inviteUrl = `${process.env.APP_URL || 'http://localhost:5173'}/accept-invitation?token=${token}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>You're Invited to Join Kalmar Studio!</h2>
      <p>Hello ${name},</p>
      <p>You've been invited to join the Kalmar Studio team. Click the button below to accept the invitation and set up your account:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${inviteUrl}" style="background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Accept Invitation</a>
      </div>
      <p>If you believe this was sent by mistake, please ignore this email.</p>
      <p>Thanks,<br>The Kalmar Studio Team</p>
    </div>
  `;
  
  await sendEmail(email, subject, html);
};
