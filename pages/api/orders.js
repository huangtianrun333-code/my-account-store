import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('account_store');
    const ordersCollection = db.collection('orders');

    switch (req.method) {
      case 'GET':
        // 获取所有订单
        const orders = await ordersCollection.find({})
          .sort({ createdAt: -1 })
          .toArray();
        res.status(200).json(orders);
        break;

      case 'POST':
        // 创建新订单
        const order = {
          ...req.body,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const result = await ordersCollection.insertOne(order);
        res.status(201).json({ 
          success: true, 
          order: { ...order, _id: result.insertedId } 
        });
        break;

      case 'PUT':
        // 更新订单状态
        const { orderId, ...updateData } = req.body;
        await ordersCollection.updateOne(
          { _id: new ObjectId(orderId) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`方法 ${req.method} 不被允许`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
}