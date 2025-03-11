
import { MongoClient, Db } from 'mongodb';

// Use a URL format that works reliably in the browser environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kalmarstudio';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

type DbConnection = {
  client: MongoClient;
  db: Db;
};

/**
 * Connect to MongoDB and return the database instance
 * This is a simplified function for mock purposes since browser can't connect directly
 */
export async function dbConnect(): Promise<DbConnection> {
  // In browser environment, this is a simulation for demonstration
  // In a real app, this would be a server-side operation
  try {
    // If we already have a connection, use it
    if (cachedClient && cachedDb) {
      return { client: cachedClient, db: cachedDb };
    }

    // For demo purposes: Create a connection (this won't actually work in browser)
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("Database connection error:", error);
    // Return a mock db connection for demonstration purposes
    // @ts-ignore - This is a mock for browser environment
    return {
      client: { close: () => console.log("Mock client closed") },
      db: {
        collection: (name: string) => ({
          find: () => ({ toArray: async () => [] }),
          findOne: async () => null,
          insertOne: async () => ({ insertedId: "mock-id" }),
          updateOne: async () => ({ modifiedCount: 1 }),
          deleteOne: async () => ({ deletedCount: 1 }),
          createIndexes: async () => {}
        })
      }
    };
  }
}

// Export connectToDatabase as alias for backward compatibility
export const connectToDatabase = dbConnect;

/**
 * Close the MongoDB connection
 */
export async function dbDisconnect(): Promise<void> {
  if (cachedClient) {
    try {
      await cachedClient.close();
      cachedClient = null;
      cachedDb = null;
    } catch (error) {
      console.error("Error disconnecting from database:", error);
    }
  }
}

/**
 * Create indexes for the application
 * This is useful to ensure proper indexing for queries
 */
export async function ensureIndexes(): Promise<void> {
  try {
    const { db } = await dbConnect();
    
    // Create indexes for users collection
    await db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true }
    ]);
    
    // Create indexes for products collection
    await db.collection('products').createIndexes([
      { key: { name: 1 } }
    ]);
    
    // Create indexes for orders collection
    await db.collection('orders').createIndexes([
      { key: { userId: 1 } },
      { key: { status: 1 } },
      { key: { createdAt: -1 } }
    ]);
    
    // Create indexes for customers collection
    await db.collection('customers').createIndexes([
      { key: { email: 1 }, unique: true }
    ]);
    
    // Create indexes for designs collection
    await db.collection('designs').createIndexes([
      { key: { userId: 1 } },
      { key: { createdAt: -1 } }
    ]);
  } catch (error) {
    console.error("Error ensuring indexes:", error);
  }
}
