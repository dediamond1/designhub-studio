
import mongoose from 'mongoose';

/**
 * Connect to MongoDB using mongoose (mock version for browser)
 */
export async function dbConnect(): Promise<typeof mongoose> {
  console.log('Mock database connection for UI demo');
  return createMockConnection();
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
    model: function mockModel(name: string) {
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
  console.log('Mock database disconnection');
  return Promise.resolve();
}

/**
 * Create indexes for the application collections
 */
export async function ensureIndexes(): Promise<void> {
  console.log('Mock indexes creation');
  return Promise.resolve();
}
