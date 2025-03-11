import { ObjectId } from 'mongodb';
import { dbConnect } from '@/lib/db';

export async function getOrders(req: any, res: any) {
  try {
    const { db } = await dbConnect();
    
    const orders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getOrder(req: any, res: any) {
  try {
    const { id } = req.params;
    const { db } = await dbConnect();
    
    const order = await db.collection('orders').findOne({ _id: new ObjectId(id) });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.status(200).json(order);
  } catch (error) {
    console.error('Get order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createOrder(req: any, res: any) {
  try {
    const { customer, items, total, status } = req.body;
    const { db } = await dbConnect();
    
    const result = await db.collection('orders').insertOne({
      customer,
      items,
      total,
      status: status || 'pending',
      createdAt: new Date(),
    });
    
    return res.status(201).json({
      id: result.insertedId,
      customer,
      items,
      total,
      status: status || 'pending',
    });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateOrderStatus(req: any, res: any) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { db } = await dbConnect();
    
    await db.collection('orders').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
    
    const updatedOrder = await db.collection('orders').findOne({ _id: new ObjectId(id) });
    
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
