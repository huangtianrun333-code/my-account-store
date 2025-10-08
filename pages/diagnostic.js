import { useState, useEffect } from 'react';
import clientPromise from '../lib/mongodb';

export default function Diagnostic() {
  const [results, setResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const diagnosticResults = {};

    try {
      // 测试 1: 基本 React 功能
      diagnosticResults.react = '✅ React 工作正常';
      
      // 测试 2: 环境变量
      diagnosticResults.env = process.env.MONGODB_URI 
        ? '✅ 环境变量已设置' 
        : '❌ MONGODB_URI 环境变量未设置';

      // 测试 3: MongoDB 连接
      try {
        const client = await clientPromise;
        const db = client.db();
        await db.command({ ping: 1 });
        diagnosticResults.mongodb = '✅ MongoDB 连接成功';
      } catch (error) {
        diagnosticResults.mongodb = `❌ MongoDB 连接失败: ${error.message}`;
      }

      // 测试 4: API 路由
      try {
        const response = await fetch('/api/status');
        if (response.ok) {
          diagnosticResults.api = '✅ API 路由工作正常';
        } else {
          diagnosticResults.api = `❌ API 路由返回 ${response.status}`;
        }
      } catch (error) {
        diagnosticResults.api = `❌ API 路由测试失败: ${error.message}`;
      }

      // 测试 5: 组件导入
      try {
        const { default: USDTpayment } = await import('../components/USDTpayment');
        diagnosticResults.components = '✅ 组件导入正常';
      } catch (error) {
        diagnosticResults.components = `❌ 组件导入失败: ${error.message}`;
      }

    } catch (error) {
      diagnosticResults.general = `❌ 诊断过程出错: ${error.message}`;
    }

    setResults(diagnosticResults);
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔧 项目诊断工具</h1>
      
      <button 
        onClick={runDiagnostics}
        disabled={isRunning}
        style={{
          padding: '10px 20px',
          backgroundColor: isRunning ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isRunning ? 'not-allowed' : 'pointer'
        }}
      >
        {isRunning ? '诊断中...' : '重新运行诊断'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <h2>诊断结果:</h2>
        {Object.entries(results).map(([key, value]) => (
          <div key={key} style={{ 
            margin: '10px 0', 
            padding: '10px',
            backgroundColor: value.includes('✅') ? '#e6ffed' : '#ffe6e6',
            border: `1px solid ${value.includes('✅') ? '#79d279' : '#ff9999'}`,
            borderRadius: '5px'
          }}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <h3>项目信息:</h3>
        <ul>
          <li>Node.js 环境: {typeof window === 'undefined' ? '服务器端' : '客户端'}</li>
          <li>构建时间: {new Date().toLocaleString()}</li>
          <li>页面路径: {typeof window !== 'undefined' ? window.location.href : '服务器端'}</li>
        </ul>
      </div>
    </div>
  );
}