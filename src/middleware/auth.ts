
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function adminMiddleware(req: any, res: any, next: any) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin privileges required' });
    }
    
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(403).json({ message: 'Admin privileges required' });
  }
}
