
/**
 * Environment variables accessor with fallbacks
 * This provides type-safe access to environment variables
 */

interface Env {
  MONGODB_URI: string;
  SENDGRID_API_KEY: string;
  APP_URL: string;
  EMAIL_FROM: string;
  SESSION_SECRET: string;
}

// Default values for local development when .env.local isn't available
const defaultEnv: Env = {
  MONGODB_URI: 'mongodb://localhost:27017/kalmarstudio',
  SENDGRID_API_KEY: 'SG.mock-key',
  APP_URL: 'http://localhost:5173',
  EMAIL_FROM: 'noreply@kalmarstudio.com',
  SESSION_SECRET: 'local-dev-secret-key-change-in-production'
};

// Get environment variables with fallbacks
export const env: Env = {
  MONGODB_URI: process.env.MONGODB_URI || defaultEnv.MONGODB_URI,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || defaultEnv.SENDGRID_API_KEY,
  APP_URL: process.env.APP_URL || defaultEnv.APP_URL,
  EMAIL_FROM: process.env.EMAIL_FROM || defaultEnv.EMAIL_FROM,
  SESSION_SECRET: process.env.SESSION_SECRET || defaultEnv.SESSION_SECRET,
};

// Function to validate required environment variables
// This can be called during app initialization
export function validateEnv(): string[] {
  const missingVars: string[] = [];
  
  // Check for missing required variables
  Object.entries(env).forEach(([key, value]) => {
    if (!value) {
      missingVars.push(key);
    }
  });
  
  return missingVars;
}
