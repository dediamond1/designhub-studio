
import { Request, Response } from 'express';
import User from '../../models/User';
import crypto from 'crypto';
import connectDB from '../../lib/db';

export default async function forgotPassword(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Find user
    const user = await User.findOne({ email });
    
    // Don't reveal that the user doesn't exist
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If that email exists in our system, a password reset link has been sent'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Set reset token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Here you would normally send an email with the reset link
    // For now we just return the token in the response
    
    return res.status(200).json({
      success: true,
      message: 'If that email exists in our system, a password reset link has been sent',
      // Only for development
      resetToken: resetToken
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing password reset request',
      error: error.message
    });
  }
}
