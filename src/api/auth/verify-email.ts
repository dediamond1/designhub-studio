
import { Request, Response } from 'express';
import User from '../../models/User';
import connectDB from '../../lib/db';

export default async function verifyEmail(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: 'Verification token is required' });
    }

    // Find user with verification token
    const user = await User.findOne({ verificationToken: token }).lean();
    
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid verification token' });
    }

    // Update user to be verified and remove token
    await User.updateOne(
      { _id: user._id },
      { 
        $set: { verified: true },
        $unset: { verificationToken: "" }
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Email successfully verified'
    });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error verifying email',
      error: error.message
    });
  }
}
