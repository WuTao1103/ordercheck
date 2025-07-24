const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 1110;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: '服务器运行正常',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 测试API
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API测试成功',
    data: { test: 'hello world' }
  });
});

// 模拟的查询记录API
app.get('/api/check-records', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        work_order: 'WO123456',
        tracking_number: '123456789012',
        check_result: 1,
        check_time: new Date().toISOString()
      }
    ],
    pagination: {
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1
    }
  });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/health`);
  console.log(`API测试: http://localhost:${PORT}/api/test`);
  console.log(`查询记录: http://localhost:${PORT}/api/check-records`);
}); 