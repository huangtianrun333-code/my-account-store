import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // 示例商品数据 - 你可以后期在管理后台修改
  const [products] = useState([
    {
      id: 1,
      name: "Telegram老号",
      price: "10",
      description: "注册超过1年的老号，稳定耐用",
      stock: 50
    },
    {
      id: 2, 
      name: "Twitter蓝V号",
      price: "25",
      description: "已认证蓝V账号，立即使用",
      stock: 20
    },
    {
      id: 3,
      name: "Instagram商业号", 
      price: "15",
      description: "适合商业推广的高质量账号",
      stock: 30
    }
  ]);

  return (
    <div className="container">
      <header>
        <h1>🔐 专业账号商店</h1>
        <p>各类国内外账号 | USDT支付 | 即时发货</p>
      </header>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          text-align: center;
          margin-bottom: 40px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}