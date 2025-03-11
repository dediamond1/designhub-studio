
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

    // Find user with this verification token - using exec() to properly execute the query
    const user = await User.findOne({ verificationToken: token }).exec();
    
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid verification token' });
    }

    // Mark as verified and remove token
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

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
