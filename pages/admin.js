import { useState, useEffect } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  
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
    description: '',
    price: '',
    image: '',
    domestic: '0',
    stock: ''
  });

  // 库存管理表单
  const [stockForm, setStockForm] = useState({
    productId: '',
    country: '',
    accountAge: '',
    quantity: ''
  });

  // 发送账号信息模态框
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
    contact: ''
  });

  // 国家列表
  const countries = [
    { code: 'US', name: '美国', flag: '🇺🇸' },
    { code: 'GB', name: '英国', flag: '🇬🇧' },
    { code: 'CA', name: '加拿大', flag: '🇨🇦' },
    { code: 'AU', name: '澳大利亚', flag: '🇦🇺' },
    { code: 'DE', name: '德国', flag: '🇩🇪' },
    { code: 'FR', name: '法国', flag: '🇫🇷' },
    { code: 'JP', name: '日本', flag: '🇯🇵' },
    { code: 'KR', name: '韩国', flag: '🇰🇷' },
    { code: 'SG', name: '新加坡', flag: '🇸🇬' },
    { code: 'IN', name: '印度', flag: '🇮🇳' }
  ];

  // 账号年龄选项
  const accountAges = [
    { value: '15', name: '15天新号' },
    { value: '30', name: '30天新号' },
    { value: '60', name: '60天' },
    { value: '180', name: '180天' },
    { value: '365', name: '1年' },
    { value: '1095', name: '3年老号' }
  ];

  // 登录功能
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === settings.adminPassword) {
      setIsAuthenticated(true);
      loadProducts();
      loadOrders();
    } else {
      alert('密码错误');
    }
  };

  // 加载商品数据
  const loadProducts = () => {
    // 从localStorage加载商品数据
    const savedProducts = localStorage.getItem('store-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // 默认商品数据
      const defaultProducts = [
        {
          id: 1,
          name: "Telegram老号",
          price: "10",
          description: "注册超过1年的老号，稳定耐用",
          image: "",
          domestic: "0",
          stock: 50
        },
        {
          id: 2, 
          name: "微信账号",
          price: "25",
          description: "已实名认证微信账号",
          image: "",
          domestic: "1",
          stock: 20
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('store-products', JSON.stringify(defaultProducts));
    }
  };

  // 加载订单数据
  const loadOrders = () => {
    const savedOrders = localStorage.getItem('store-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  };

  // 添加新商品
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      ...newProduct,
      stock: parseInt(newProduct.stock)
    };
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('store-products', JSON.stringify(updatedProducts));
    setNewProduct({ name: '', description: '', price: '', image: '', domestic: '0', stock: '' });
    alert('商品添加成功！');
  };

  // 删除商品
  const handleDeleteProduct = (productId) => {
    if (confirm('确定要删除这个商品吗？')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('store-products', JSON.stringify(updatedProducts));
    }
  };

  // 更新库存
  const handleUpdateStock = (e) => {
    e.preventDefault();
    // 这里可以添加库存更新逻辑
    alert('库存更新功能已提交！在实际应用中，这里会更新数据库中的库存数据。');
    setStockForm({ productId: '', country: '', accountAge: '', quantity: '' });
  };

  // 发送账号信息
  const handleSendAccount = (e) => {
    e.preventDefault();
    if (currentOrder) {
      const updatedOrders = orders.map(order => 
        order.id === currentOrder.id 
          ? { ...order, status: 'completed', accountInfo }
          : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('store-orders', JSON.stringify(updatedOrders));
      setShowAccountModal(false);
      setAccountInfo({ username: '', password: '', contact: '' });
      alert('账号信息已发送！');
    }
  };

  // 更新设置
  const handleUpdateSettings = (e) => {
    e.preventDefault();
    alert('设置已更新！');
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
        <h1>号商平台管理后台</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="logout-btn"
        >
          退出登录
        </button>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === 'products' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('products')}
        >
          商品管理
        </button>
        <button 
          className={activeTab === 'stock' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('stock')}
        >
          库存管理
        </button>
        <button 
          className={activeTab === 'orders' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('orders')}
        >
          订单管理
        </button>
        <button 
          className={activeTab === 'settings' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('settings')}
        >
          系统设置
        </button>
      </nav>

      <div className="admin-content">
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
              <div className="form-group">
                <input
                  type="text"
                  placeholder="图片URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
                <select
                  value={newProduct.domestic}
                  onChange={(e) => setNewProduct({...newProduct, domestic: e.target.value})}
                >
                  <option value="0">国际软件</option>
                  <option value="1">国内软件</option>
                </select>
              </div>
              <input
                type="number"
                placeholder="库存数量"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                required
              />
              <button type="submit" className="add-btn">上架商品</button>
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
                      <span>类型: {product.domestic === '1' ? '国内软件' : '国际软件'}</span>
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

        {/* 库存管理 */}
        {activeTab === 'stock' && (
          <div className="tab-content">
            <h2>库存管理</h2>
            
            <form onSubmit={handleUpdateStock} className="stock-form">
              <div className="form-group">
                <label>选择商品:</label>
                <select
                  value={stockForm.productId}
                  onChange={(e) => setStockForm({...stockForm, productId: e.target.value})}
                  required
                >
                  <option value="">-- 请选择商品 --</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>国家 (仅国际软件):</label>
                <select
                  value={stockForm.country}
                  onChange={(e) => setStockForm({...stockForm, country: e.target.value})}
                >
                  <option value="">-- 请选择国家 --</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>账号年龄:</label>
                <select
                  value={stockForm.accountAge}
                  onChange={(e) => setStockForm({...stockForm, accountAge: e.target.value})}
                  required
                >
                  <option value="">-- 请选择账号年龄 --</option>
                  {accountAges.map(age => (
                    <option key={age.value} value={age.value}>
                      {age.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>库存数量:</label>
                <input
                  type="number"
                  value={stockForm.quantity}
                  onChange={(e) => setStockForm({...stockForm, quantity: e.target.value})}
                  min="0"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">更新库存</button>
            </form>
          </div>
        )}

        {/* 订单管理 */}
        {activeTab === 'orders' && (
          <div className="tab-content">
            <h2>订单管理</h2>
            
            <table className="orders-table">
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>商品名称</th>
                  <th>联系方式</th>
                  <th>数量</th>
                  <th>总价</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{textAlign: 'center'}}>暂无订单</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.productName}</td>
                      <td>{order.contactInfo || 'N/A'}</td>
                      <td>{order.quantity}</td>
                      <td>{order.amount} USDT</td>
                      <td className={`status-${order.status}`}>
                        {order.status === 'pending' ? '待处理' : 
                         order.status === 'completed' ? '已完成' : '已取消'}
                      </td>
                      <td>
                        {order.status === 'pending' && (
                          <button 
                            className="action-btn"
                            onClick={() => {
                              setCurrentOrder(order);
                              setShowAccountModal(true);
                            }}
                          >
                            发送账号
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
          </div>
        )}
      </div>

      {/* 发送账号信息模态框 */}
      {showAccountModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>发送账号信息</h3>
              <button 
                className="close-modal"
                onClick={() => setShowAccountModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSendAccount}>
              <div className="form-group">
                <label>用户名:</label>
                <input
                  type="text"
                  value={accountInfo.username}
                  onChange={(e) => setAccountInfo({...accountInfo, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>密码:</label>
                <input
                  type="text"
                  value={accountInfo.password}
                  onChange={(e) => setAccountInfo({...accountInfo, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>您的联系方式:</label>
                <input
                  type="text"
                  value={accountInfo.contact}
                  onChange={(e) => setAccountInfo({...accountInfo, contact: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">发送账号信息</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background: #1a1a2e;
          color: #f8f9fa;
          min-height: 100vh;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 2px solid #2a9d8f;
        }
        .logout-btn {
          background: #e76f51;
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
          border-bottom: 1px solid #4a5079;
        }
        .nav-btn {
          padding: 12px 24px;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          color: #b0b0b0;
        }
        .nav-btn.active {
          border-bottom-color: #2a9d8f;
          color: #2a9d8f;
        }
        .tab-content {
          background: #2d3047;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .product-form, .stock-form, .settings-form {
          background: #3a3e5b;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          color: #b0b0b0;
        }
        input, textarea, select {
          width: 100%;
          padding: 10px;
          background: #2d3047;
          border: 1px solid #4a5079;
          border-radius: 4px;
          color: white;
        }
        .form-group input, .form-group select {
          margin-bottom: 10px;
        }
        .add-btn, .submit-btn, .save-btn {
          background: #2a9d8f;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }
        .products-list {
          margin-top: 30px;
        }
        .product-item {
          border: 1px solid #4a5079;
          border-radius: 8px;
          padding: 20px;
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product-details h4 {
          margin: 0 0 5px 0;
          color: #e9c46a;
        }
        .product-meta {
          display: flex;
          gap: 20px;
          margin-top: 10px;
          color: #b0b0b0;
        }
        .delete-btn {
          background: #e76f51;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }
        .orders-table th, .orders-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #4a5079;
        }
        .orders-table th {
          background: #3a3e5b;
          color: #e9c46a;
        }
        .status-pending {
          color: #e9c46a;
        }
        .status-completed {
          color: #2a9d8f;
        }
        .action-btn {
          background: #2a9d8f;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #2d3047;
          padding: 30px;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #4a5079;
        }
        .close-modal {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}