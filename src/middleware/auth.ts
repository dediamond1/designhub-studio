
import { Request, Response, NextFunction } from 'express';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';

// Extended Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
      session: {
        userId?: string;
        role?: string;
        isAuthenticated?: boolean;
      }
    }
  }
}

/**
 * Middleware to authenticate API requests
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Check if the request has a valid session
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    // Get the user from the database
    const { db } = await dbConnect();
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.session.userId) });

    if (!user) {
      // Clear invalid session
      req.session.userId = undefined;
      req.session.role = undefined;
      req.session.isAuthenticated = false;
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

/**
 * Middleware to check if user has admin role
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  
  next();
};

/**
 * Middleware to verify that user has the specified role
 */
export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }
    
    next();
  };
};
