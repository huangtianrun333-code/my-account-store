import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import USDTpayment from '../components/USDTpayment';

export default function Order() {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);

  // 根据商品ID获取商品信息
  useEffect(() => {
    if (id) {
      // 这里应该从API获取，暂时用模拟数据
      const products = {
        '1': { id: 1, name: "Telegram老号", price: "10" },
        '2': { id: 2, name: "Twitter蓝V号", price: "25" },
        '3': { id: 3, name: "Instagram商业号", price: "15" }
      };
      setProduct(products[id]);
      
      // 创建新订单
      const newOrder = {
        id: Date.now(),
        productId: id,
        productName: products[id]?.name,
        amount: products[id]?.price,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      setOrder(newOrder);
    }
  }, [id]);

  if (!product || !order) {
    return <div className="container">加载中...</div>;
  }

  return (
    <div className="container">
      <h1>下单购买</h1>
      
      <div className="order-summary">
        <h2>订单详情</h2>
        <p><strong>商品:</strong> {product.name}</p>
        <p><strong>金额:</strong> {order.amount} USDT</p>
        <p><strong>订单号:</strong> {order.id}</p>
      </div>

      <USDTpayment order={order} />

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .order-summary {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
}