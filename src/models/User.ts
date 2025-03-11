
import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '@/types/user';

const UserSchema = new Schema<UserDocument>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String,
    required: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'user', 'team-member'],
    default: 'user' 
  },
  verified: { 
    type: Boolean, 
    default: false 
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret.__v;
      return ret;
    }
  }
});

// Create compound index for email lookup
UserSchema.index({ email: 1 });

// Don't use model in browser environment
const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
