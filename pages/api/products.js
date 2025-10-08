import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('account_store');
    const productsCollection = db.collection('products');

    switch (req.method) {
      case 'GET':
        const products = await productsCollection.find({}).toArray();
        res.status(200).json(products);
        break;

      case 'POST':
        const product = {
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const result = await productsCollection.insertOne(product);
        res.status(201).json({ 
          success: true, 
          product: { ...product, _id: result.insertedId } 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`方法 ${req.method} 不被允许`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
}