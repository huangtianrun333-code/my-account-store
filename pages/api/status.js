// pages/api/status.js
export default function handler(req, res) {
  res.status(200).json({ 
    success: true, 
    message: 'API 路由工作正常！',
    timestamp: new Date().toISOString()
  });
}