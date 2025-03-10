
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function login(req: any, res: any) {
  try {
    const { email, password } = req.body;
    const { db } = await connectToDatabase();
    
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Set JWT as HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`
    );
    
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function register(req: any, res: any) {
  try {
    const { name, email, password } = req.body;
    const { db } = await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
    });
    
    const user = {
      id: result.insertedId,
      name,
      email,
      role: 'user',
    };
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Set JWT as HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`
    );
    
    return res.status(201).json(user);
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function logout(req: any, res: any) {
  // Clear the auth cookie
  res.setHeader(
    'Set-Cookie',
    'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
  );
  
  return res.status(200).json({ message: 'Logged out successfully' });
}

export async function getMe(req: any, res: any) {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { db } = await connectToDatabase();
    
    const user = await db.collection('users').findOne({ _id: decoded.id });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
