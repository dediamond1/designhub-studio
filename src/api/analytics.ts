
import { connectToDatabase } from '@/lib/db';

export async function getDashboardMetrics(req: any, res: any) {
  try {
    const { db } = await connectToDatabase();
    
    // Get total orders
    const totalOrders = await db.collection('orders').countDocuments();
    
    // Get total revenue
    const orders = await db.collection('orders').find({}).toArray();
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + parseFloat(order.total || 0), 0);
    
    // Get total customers
    const totalCustomers = await db.collection('customers').countDocuments();
    
    // Get recent orders
    const recentOrders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    // Get total products
    const totalProducts = await db.collection('products').countDocuments();
    
    // Get sales by month
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlySales = await db.collection('orders')
      .aggregate([
        { 
          $match: { 
            createdAt: { $gte: sixMonthsAgo } 
          } 
        },
        {
          $group: {
            _id: { 
              year: { $year: "$createdAt" }, 
              month: { $month: "$createdAt" } 
            },
            sales: { $sum: { $toDouble: "$total" } }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ])
      .toArray();
    
    return res.status(200).json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
      recentOrders,
      monthlySales: monthlySales.map(item => ({
        month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
        sales: item.sales
      }))
    });
  } catch (error) {
    console.error('Get dashboard metrics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getProductsAnalytics(req: any, res: any) {
  try {
    const { db } = await connectToDatabase();
    
    // Get top selling products
    const topSellingProducts = await db.collection('orders')
      .aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productId",
            totalSold: { $sum: "$items.quantity" },
            totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product"
          }
        },
        { $unwind: "$product" },
        {
          $project: {
            _id: 1,
            name: "$product.name",
            totalSold: 1,
            totalRevenue: 1
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 5 }
      ])
      .toArray();
    
    // Get product categories distribution
    const productCategories = await db.collection('products')
      .aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ])
      .toArray();
    
    return res.status(200).json({
      topSellingProducts,
      productCategories: productCategories.map(item => ({
        category: item._id,
        count: item.count
      }))
    });
  } catch (error) {
    console.error('Get products analytics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
