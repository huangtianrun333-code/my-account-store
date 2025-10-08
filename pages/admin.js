import { useState } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);

  // 简单的密码验证
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // 记得修改这个密码
      setIsAuthenticated(true);
    } else {
      alert('密码错误');
    }
  };

  const markAsShipped = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'shipped' } : order
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="login-form">
          <h2>管理员登录</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入管理员密码"
              className="password-input"
            />
            <button type="submit" className="login-btn">登录</button>
          </form>
        </div>

        <style jsx>{`
          .container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
          }
          .login-form {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .password-input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 6px;
          }
          .login-btn {
            width: 100%;
            padding: 12px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>订单管理后台</h1>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>暂无订单</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <strong>订单 #{order.id}</strong>
                <p>商品: {order.productName}</p>
                <p>金额: {order.amount} USDT</p>
                <p>状态: 
                  <span className={`status ${order.status}`}>
                    {order.status === 'pending' ? '待处理' : '已发货'}
                  </span>
                </p>
                <p>交易哈希: {order.txHash}</p>
              </div>
              {order.status === 'pending' && (
                <button 
                  onClick={() => markAsShipped(order.id)}
                  className="ship-btn"
                >
                  标记为已发货
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .order-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin: 10px 0;
          display: flex;
          justify-content: between;
          align-items: center;
        }
        .order-info {
          flex: 1;
        }
        .status.pending {
          color: #f59e0b;
          margin-left: 10px;
        }
        .status.shipped {
          color: #10b981;
          margin-left: 10px;
        }
        .ship-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}