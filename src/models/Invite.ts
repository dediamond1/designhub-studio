
import mongoose, { Schema } from 'mongoose';
import { InviteDocument } from '@/types/user';

const InviteSchema = new Schema<InviteDocument>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'team-member'],
    default: 'team-member' 
  },
  invitedBy: { 
    type: String, 
    required: true 
  },
  token: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: '7d' // Automatically delete after 7 days
  }
});

// Create indexes
InviteSchema.index({ email: 1 });
InviteSchema.index({ token: 1 });

// This is a dummy model for UI demo purposes only
const InviteModel = mongoose.models.Invite || mongoose.model<InviteDocument>('Invite', InviteSchema);

export default InviteModel;
