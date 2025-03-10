
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kalmarstudio';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Connect to MongoDB and return the database instance
 */
export async function dbConnect() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Connect to MongoDB
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

/**
 * Close the MongoDB connection
 */
export async function dbDisconnect() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

/**
 * Create indexes for the application
 * This is useful to ensure proper indexing for queries
 */
export async function ensureIndexes() {
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
}
