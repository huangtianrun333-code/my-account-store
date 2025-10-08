import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('account_store');
    const settingsCollection = db.collection('settings');

    switch (req.method) {
      case 'GET':
        // 获取设置
        let settings = await settingsCollection.findOne({ type: 'store_settings' });
        if (!settings) {
          // 默认设置
          settings = {
            type: 'store_settings',
            adminPassword: 'admin123',
            usdtAddress: 'TY...你的USDT地址...',
            createdAt: new Date()
          };
          await settingsCollection.insertOne(settings);
        }
        res.status(200).json(settings);
        break;

      case 'PUT':
        // 更新设置
        await settingsCollection.updateOne(
          { type: 'store_settings' },
          { $set: { ...req.body, updatedAt: new Date() } },
          { upsert: true }
        );
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`方法 ${req.method} 不被允许`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
}