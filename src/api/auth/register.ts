
import { Request, Response } from 'express';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import connectDB from '../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function register(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if user already exists - using exec() to properly execute the query
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      verificationToken,
      verified: false
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user info (excluding password)
    const userData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      verified: newUser.verified
    };

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      user: userData,
      token
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error registering new user',
      error: error.message
    });
  }
}
