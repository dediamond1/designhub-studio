
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function getDesigns(req: any, res: any) {
  try {
    const { db } = await connectToDatabase();
    
    const designs = await db.collection('designs')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return res.status(200).json(designs);
  } catch (error) {
    console.error('Get designs error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getDesign(req: any, res: any) {
  try {
    const { id } = req.params;
    const { db } = await connectToDatabase();
    
    const design = await db.collection('designs').findOne({ _id: new ObjectId(id) });
    
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    
    return res.status(200).json(design);
  } catch (error) {
    console.error('Get design error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createDesign(req: any, res: any) {
  try {
    const { name, customer, template, elements } = req.body;
    const { db } = await connectToDatabase();
    
    const result = await db.collection('designs').insertOne({
      name,
      customer,
      template,
      elements,
      createdAt: new Date(),
    });
    
    return res.status(201).json({
      id: result.insertedId,
      name,
      customer,
      template,
      elements,
    });
  } catch (error) {
    console.error('Create design error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateDesign(req: any, res: any) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { db } = await connectToDatabase();
    
    delete updates._id; // Prevent _id field from being updated
    
    await db.collection('designs').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );
    
    const updatedDesign = await db.collection('designs').findOne({ _id: new ObjectId(id) });
    
    return res.status(200).json(updatedDesign);
  } catch (error) {
    console.error('Update design error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteDesign(req: any, res: any) {
  try {
    const { id } = req.params;
    const { db } = await connectToDatabase();
    
    await db.collection('designs').deleteOne({ _id: new ObjectId(id) });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Delete design error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
