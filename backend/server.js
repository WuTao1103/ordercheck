const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 1110;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || '192.168.0.50',  // NAS服务器IP
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'ordercheck_db'
};

// 创建数据库连接池
let pool;

async function initializeDatabase() {
  try {
    // 首先连接到MySQL服务器（不指定数据库）
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    // 创建数据库
    await connection.execute('CREATE DATABASE IF NOT EXISTS ordercheck_db');
    await connection.end();

    // 连接到指定数据库
    pool = mysql.createPool(dbConfig);

    // 创建表
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS check_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        work_order VARCHAR(100) NOT NULL,
        tracking_number VARCHAR(100) NOT NULL,
        check_result BOOLEAN NOT NULL,
        check_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_work_order (work_order),
        INDEX idx_tracking_number (tracking_number),
        INDEX idx_check_time (check_time)
      )
    `;
    
    await pool.execute(createTableQuery);
    console.log('数据库和表初始化完成');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

// API路由

// 保存核对记录
app.post('/api/check-records', async (req, res) => {
  try {
    const { workOrder, trackingNumber, checkResult } = req.body;
    
    const query = `
      INSERT INTO check_records (work_order, tracking_number, check_result) 
      VALUES (?, ?, ?)
    `;
    
    await pool.execute(query, [workOrder, trackingNumber, checkResult]);
    
    res.json({ success: true, message: '记录保存成功' });
  } catch (error) {
    console.error('保存记录失败:', error);
    res.status(500).json({ success: false, message: '保存记录失败' });
  }
});

// 查询核对记录
app.get('/api/check-records', async (req, res) => {
  try {
    const { workOrder, trackingNumber, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    let whereConditions = [];
    let params = [];
    
    if (workOrder) {
      whereConditions.push('work_order LIKE ?');
      params.push(`%${workOrder}%`);
    }
    
    if (trackingNumber) {
      whereConditions.push('tracking_number LIKE ?');
      params.push(`%${trackingNumber}%`);
    }
    
    if (startDate) {
      whereConditions.push('check_time >= ?');
      params.push(startDate);
    }
    
    if (endDate) {
      whereConditions.push('check_time <= ?');
      params.push(endDate + ' 23:59:59');
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    // 使用简单的查询语句，避免参数错误
    const simpleQuery = `SELECT * FROM check_records ${whereClause} ORDER BY check_time DESC LIMIT 20`;
    const [records] = await pool.execute(simpleQuery, params);
    
    res.json({
      success: true,
      data: records,
      pagination: {
        total: records.length,
        page: 1,
        limit: 20,
        totalPages: 1
      }
    });
  } catch (error) {
    console.error('查询记录失败:', error);
    res.status(500).json({ success: false, message: '查询记录失败' });
  }
});

// 获取统计信息
app.get('/api/check-records/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let whereConditions = [];
    let params = [];
    
    if (startDate) {
      whereConditions.push('check_time >= ?');
      params.push(startDate);
    }
    
    if (endDate) {
      whereConditions.push('check_time <= ?');
      params.push(endDate + ' 23:59:59');
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    const statsQuery = `
      SELECT 
        COUNT(*) as total_checks,
        SUM(CASE WHEN check_result = 1 THEN 1 ELSE 0 END) as success_count,
        SUM(CASE WHEN check_result = 0 THEN 1 ELSE 0 END) as failure_count
      FROM check_records 
      ${whereClause}
    `;
    
    const [stats] = await pool.execute(statsQuery, params);
    
    res.json({
      success: true,
      data: {
        totalChecks: stats[0].total_checks,
        successCount: stats[0].success_count,
        failureCount: stats[0].failure_count,
        successRate: stats[0].total_checks > 0 ? (stats[0].success_count / stats[0].total_checks * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    console.error('获取统计信息失败:', error);
    res.status(500).json({ success: false, message: '获取统计信息失败' });
  }
});

// 启动服务器
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
}

startServer(); 