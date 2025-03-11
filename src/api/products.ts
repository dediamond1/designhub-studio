import { ObjectId } from 'mongodb';
import { dbConnect } from '@/lib/db';

export async function getProducts(req: any, res: any) {
  try {
    const { db } = await dbConnect();
    
    const products = await db.collection('products')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return res.status(200).json(products);
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getProduct(req: any, res: any) {
  try {
    const { id } = req.params;
    const { db } = await dbConnect();
    
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.status(200).json(product);
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createProduct(req: any, res: any) {
  try {
    const { name, category, price, stock, status } = req.body;
    const { db } = await dbConnect();
    
    const result = await db.collection('products').insertOne({
      name,
      category,
      price,
      stock,
      status,
      createdAt: new Date(),
    });
    
    return res.status(201).json({
      id: result.insertedId,
      name,
      category,
      price,
      stock,
      status,
    });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateProduct(req: any, res: any) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { db } = await dbConnect();
    
    delete updates._id; // Prevent _id field from being updated
    
    await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );
    
    const updatedProduct = await db.collection('products').findOne({ _id: new ObjectId(id) });
    
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteProduct(req: any, res: any) {
  try {
    const { id } = req.params;
    const { db } = await dbConnect();
    
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
