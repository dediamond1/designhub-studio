
import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  id: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'user' | 'team-member';
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  verified: boolean;
  lastLogin?: Date;
}

export type UserResponse = Omit<UserDocument, 'password' | 'resetPasswordToken' | 'resetPasswordExpires' | 'verificationToken'>;

export interface AuthResponse {
  user: UserResponse;
  success: boolean;
  message?: string;
}

export interface InviteDocument extends Document {
  email: string;
  name: string;
  role: 'admin' | 'team-member';
  invitedBy: string;
  token: string;
  createdAt: Date;
}
