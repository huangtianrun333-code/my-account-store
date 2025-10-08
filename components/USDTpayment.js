import { useState } from 'react';

export default function USDTpayment({ order }) {
  // ⭐️ 在这里填写你的USDT收款地址（TRC20网络）
  const usdtAddress = 'TY...你的USDT地址...';
  
  const [txHash, setTxHash] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 这里可以添加提交到API的逻辑
    console.log('提交交易哈希:', txHash);
    setIsSubmitted(true);
    
    // 在实际应用中，这里应该调用API保存交易哈希
    // await fetch('/api/orders', {
    //   method: 'POST',
    //   body: JSON.stringify({ orderId: order.id, txHash })
    // });
  };

  return (
    <div className="payment-section">
      <h2>💰 USDT 支付</h2>
      
      <div className="payment-instructions">
        <p>请向以下地址支付 <strong>{order.amount} USDT</strong></p>
        
        <div className="address-box">
          <strong>收款地址 (TRC20):</strong>
          <div className="address">{usdtAddress}</div>
          <button 
            onClick={() => navigator.clipboard.writeText(usdtAddress)}
            className="copy-btn"
          >
            复制地址
          </button>
        </div>

        <div className="manual-payment-instructions">
          <h3>支付说明：</h3>
          <ol>
            <li>复制上面的 USDT 收款地址</li>
            <li>打开您的加密货币钱包（如 Trust Wallet、MetaMask 等）</li>
            <li>选择 USDT（TRC20 网络）进行转账</li>
            <li>粘贴收款地址并输入金额 <strong>{order.amount} USDT</strong></li>
            <li>完成支付后在下方提交交易哈希</li>
          </ol>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="tx-form">
            <label>
              支付后，请在此提交交易哈希 (TxHash):
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="输入交易哈希..."
                required
                className="tx-input"
              />
            </label>
            <button type="submit" className="submit-btn">
              提交交易凭证
            </button>
          </form>
        ) : (
          <div className="success-message">
            ✅ 已收到你的交易凭证！我们会在区块链上确认后立即发货。
            <br />
            <small>请保持Telegram联系渠道畅通</small>
          </div>
        )}
      </div>

      <style jsx>{`
        .payment-section {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 30px;
          margin-top: 20px;
        }
        .address-box {
          background: #f3f4f6;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
        }
        .address {
          font-family: monospace;
          word-break: break-all;
          margin: 10px 0;
          font-size: 14px;
        }
        .copy-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .manual-payment-instructions {
          background: #f0f9ff;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #3b82f6;
        }
        .manual-payment-instructions h3 {
          margin-top: 0;
          color: #1e40af;
        }
        .manual-payment-instructions ol {
          margin: 10px 0;
          padding-left: 20px;
        }
        .manual-payment-instructions li {
          margin-bottom: 8px;
        }
        .tx-form {
          margin-top: 20px;
        }
        .tx-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          margin: 10px 0;
          font-size: 16px;
        }
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }
        .success-message {
          text-align: center;
          padding: 20px;
          background: #d1fae5;
          border-radius: 8px;
          color: #065f46;
        }
      `}</style>
    </div>
  );
}