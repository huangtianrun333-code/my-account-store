import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price">💰 {product.price} USDT</div>
        <div className="stock">库存: {product.stock}</div>
      </div>
      
      <Link href={`/order?id=${product.id}`}>
        <button className="buy-btn">立即购买</button>
      </Link>

      <style jsx>{`
        .product-card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .product-card:hover {
          transform: translateY(-2px);
        }
        .product-info h3 {
          margin: 0 0 10px 0;
          color: #333;
        }
        .price {
          font-size: 1.5em;
          font-weight: bold;
          color: #10b981;
          margin: 10px 0;
        }
        .stock {
          color: #666;
          font-size: 0.9em;
        }
        .buy-btn {
          width: 100%;
          padding: 12px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1em;
          cursor: pointer;
          margin-top: 15px;
        }
        .buy-btn:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
}