import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("account_store")

    // 测试连接
    const testResult = await db.command({ ping: 1 })
    
    res.status(200).json({ 
      success: true, 
      message: '成功连接到MongoDB!',
      ping: testResult
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ 
      success: false, 
      error: '无法连接到数据库: ' + e.message 
    })
  }
}