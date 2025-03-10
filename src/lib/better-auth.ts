
import { createAuth } from 'better-auth';
import { dbConnect } from './db';

// Create and configure better-auth
export const auth = createAuth({
  // Connect to MongoDB
  dbAdapter: async () => {
    const { db } = await dbConnect();
    return db;
  },
  
  // Configure JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-me-in-production',
    expiresIn: '7d',
  },
  
  // Configure collections
  collections: {
    users: 'users',
    sessions: 'sessions',
  },
  
  // Configure password hashing
  passwordHashing: {
    saltRounds: 10,
  },
  
  // Email configuration (replace with your own settings in production)
  emailConfig: {
    from: 'noreply@kalmarstudio.com',
    transport: {
      host: process.env.EMAIL_HOST || 'smtp.example.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      auth: {
        user: process.env.EMAIL_USER || 'user',
        pass: process.env.EMAIL_PASS || 'password',
      },
    },
  },
});

// Export auth middleware
export const authMiddleware = auth.middleware();
