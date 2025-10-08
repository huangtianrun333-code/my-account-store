import { useState, useEffect } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  
  // 管理状态
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState({
    adminPassword: 'admin123',
    usdtAddress: 'TY...你的USDT地址...'
  });

  // 新商品表单
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: ''
  });

  // 登录功能
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === settings.adminPassword) {
      setIsAuthenticated(true);
      // 加载商品数据
      loadProducts();
    } else {
      alert('密码错误');
    }
  };

  // 加载商品数据
  const loadProducts = () => {
    // 这里应该从API获取，暂时用模拟数据
    const sampleProducts = [
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
      }
    ];
    setProducts(sampleProducts);
  };

  // 添加新商品
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      ...newProduct
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', description: '', stock: '' });
    alert('商品添加成功！');
  };

  // 删除商品
  const handleDeleteProduct = (productId) => {
    if (confirm('确定要删除这个商品吗？')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  // 更新设置
  const handleUpdateSettings = (e) => {
    e.preventDefault();
    alert('设置已更新！');
    // 在实际应用中，这里应该调用API保存设置
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
      <header className="admin-header">
        <h1>店铺管理后台</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="logout-btn"
        >
          退出登录
        </button>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === 'orders' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('orders')}
        >
          订单管理
        </button>
        <button 
          className={activeTab === 'products' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('products')}
        >
          商品管理
        </button>
        <button 
          className={activeTab === 'settings' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('settings')}
        >
          系统设置
        </button>
      </nav>

      <div className="admin-content">
        {/* 订单管理 */}
        {activeTab === 'orders' && (
          <div className="tab-content">
            <h2>订单管理</h2>
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
                      onClick={() => {/* 标记发货逻辑 */}}
                      className="ship-btn"
                    >
                      标记为已发货
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* 商品管理 */}
        {activeTab === 'products' && (
          <div className="tab-content">
            <h2>商品管理</h2>
            
            {/* 添加商品表单 */}
            <form onSubmit={handleAddProduct} className="product-form">
              <h3>添加新商品</h3>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="商品名称"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="价格 (USDT)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>
              <textarea
                placeholder="商品描述"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="库存数量"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                required
              />
              <button type="submit" className="add-btn">添加商品</button>
            </form>

            {/* 商品列表 */}
            <div className="products-list">
              <h3>商品列表</h3>
              {products.map(product => (
                <div key={product.id} className="product-item">
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="product-meta">
                      <span>价格: {product.price} USDT</span>
                      <span>库存: {product.stock}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="delete-btn"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 系统设置 */}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <h2>系统设置</h2>
            
            <form onSubmit={handleUpdateSettings} className="settings-form">
              <div className="setting-group">
                <label>管理员密码:</label>
                <input
                  type="password"
                  value={settings.adminPassword}
                  onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
                  placeholder="设置新的管理员密码"
                />
              </div>

              <div className="setting-group">
                <label>USDT收款地址 (TRC20):</label>
                <textarea
                  value={settings.usdtAddress}
                  onChange={(e) => setSettings({...settings, usdtAddress: e.target.value})}
                  placeholder="输入您的USDT收款地址"
                  rows="3"
                />
              </div>

              <button type="submit" className="save-btn">保存设置</button>
            </form>

            <div className="settings-info">
              <h3>使用说明</h3>
              <ul>
                <li>修改密码后请妥善保管新密码</li>
                <li>USDT地址修改后立即生效</li>
                <li>添加商品后会在前台立即显示</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .logout-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }
        .admin-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 1px solid #e5e7eb;
        }
        .nav-btn {
          padding: 12px 24px;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .nav-btn.active {
          border-bottom-color: #3b82f6;
          color: #3b82f6;
        }
        .tab-content {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .order-item, .product-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product-form, .settings-form {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .form-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }
        .add-btn, .save-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }
        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .product-details h4 {
          margin: 0 0 5px 0;
        }
        .product-meta {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }
        .setting-group {
          margin-bottom: 20px;
        }
        .setting-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .settings-info {
          background: #dbeafe;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
}