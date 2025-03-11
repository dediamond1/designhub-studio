import { ObjectId } from 'mongodb';
import { dbConnect } from '@/lib/db';

export async function getCustomers(req: any, res: any) {
  try {
    const { db } = await dbConnect();
    
    const customers = await db.collection('customers')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return res.status(200).json(customers);
  } catch (error) {
    console.error('Get customers error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getCustomer(req: any, res: any) {
  try {
    const { id } = req.params;
    const { db } = await dbConnect();
    
    const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    return res.status(200).json(customer);
  } catch (error) {
    console.error('Get customer error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createCustomer(req: any, res: any) {
  try {
    const { name, email, phone } = req.body;
    const { db } = await dbConnect();
    
    const result = await db.collection('customers').insertOne({
      name,
      email,
      phone,
      orders: [],
      totalSpent: 0,
      createdAt: new Date(),
    });
    
    return res.status(201).json({
      id: result.insertedId,
      name,
      email,
      phone,
      orders: [],
      totalSpent: 0,
    });
  } catch (error) {
    console.error('Create customer error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateCustomer(req: any, res: any) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { db } = await dbConnect();
    
    delete updates._id; // Prevent _id field from being updated
    
    await db.collection('customers').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );
    
    const updatedCustomer = await db.collection('customers').findOne({ _id: new ObjectId(id) });
    
    return res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Update customer error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
