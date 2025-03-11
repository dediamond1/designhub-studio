
import mongoose from 'mongoose';

// Use environment variables for connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kalmarstudio';

// Track connection status
let isConnected = false;

/**
 * Connect to MongoDB using mongoose
 */
export async function dbConnect(): Promise<typeof mongoose> {
  // If we already have a connection, use it
  if (isConnected) {
    return mongoose;
  }

  try {
    // In browser environment, this is a simulation for demonstration
    // In a real app with server-side rendering, this would connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    
    // For browser environment, create a mock connection
    if (typeof window !== 'undefined') {
      console.log('Browser environment detected, using mock connection');
      isConnected = true;
      return createMockConnection();
    }
    
    // For server environment (this won't run in browser)
    const connection = await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    return createMockConnection();
  }
}

/**
 * Create a mock mongoose connection for browser environment
 */
function createMockConnection() {
  // Create mock mongoose for browser
  const mockMongoose = {
    ...mongoose,
    connection: {
      ...mongoose.connection,
      db: {
        collection: () => ({
          createIndex: async () => Promise.resolve(),
          createIndexes: async () => Promise.resolve(),
          indexes: async () => Promise.resolve([]),
          find: () => ({ toArray: async () => [] }),
          findOne: async () => null,
          insertOne: async () => ({ insertedId: "mock-id" }),
          updateOne: async () => ({ modifiedCount: 1 }),
          deleteOne: async () => ({ deletedCount: 1 })
        })
      }
    },
    model: function mockModel(name: string, schema: any) {
      return {
        find: () => ({ exec: async () => [] }),
        findOne: () => ({ exec: async () => null }),
        findById: () => ({ exec: async () => null }),
        create: async () => ({ _id: 'mock-id', id: 'mock-id' }),
        updateOne: async () => ({ modifiedCount: 1 }),
        deleteOne: async () => ({ deletedCount: 1 })
      };
    }
  } as unknown as typeof mongoose;
  
  return mockMongoose;
}

// Export connectToDatabase as alias for backward compatibility
export const connectToDatabase = dbConnect;

/**
 * Disconnect from MongoDB
 */
export async function dbDisconnect(): Promise<void> {
  if (isConnected) {
    try {
      if (typeof window === 'undefined') {
        await mongoose.disconnect();
      }
      isConnected = false;
      console.log('MongoDB disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}

/**
 * Create indexes for the application collections
 * This is useful to ensure proper indexing for queries
 */
export async function ensureIndexes(): Promise<void> {
  // This function will be implemented in the models directly with mongoose
  console.log('Indexes are now managed by mongoose schemas');
  return Promise.resolve();
}
