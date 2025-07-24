const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 1110;

// 中间件
app.use(cors());
app.use(express.json());

// 简单的健康检查
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: '服务器运行正常',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 简单的API测试
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API测试成功',
    data: { test: 'hello world' }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`测试服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/health`);
  console.log(`API测试: http://localhost:${PORT}/api/test`);
}); 