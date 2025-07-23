# 测试指南

## 环境准备

### 1. 确保MySQL服务运行
```bash
# 检查MySQL是否在192.168.0.50:3306运行
mysqladmin ping -h"192.168.0.50" -P"3306" -u"root" -p"123456"
```

### 2. 启动后端服务
```bash
cd backend
npm install
npm start
```

### 3. 启动前端服务
```bash
# 在项目根目录
npm install
npm start
```

## 功能测试

### 测试1: API接口测试
```bash
# 安装node-fetch（如果还没有）
npm install node-fetch

# 运行API测试
node test-api.js
```

### 测试2: 前端功能测试

1. **Excel文件上传测试**
   - 准备一个包含"寄修单号"和"跟踪号"列的Excel文件
   - 在前端上传文件，检查是否正确解析

2. **订单核对测试**
   - 输入工单号和跟踪号
   - 测试成功和失败的情况
   - 检查音效是否正常播放

3. **记录查询测试**
   - 点击"查看记录"按钮
   - 测试搜索功能（工单号、跟踪号、时间范围）
   - 检查统计信息显示

### 测试3: 数据库测试

```sql
-- 连接到数据库
mysql -h192.168.0.50 -uroot -p123456 ordercheck_db

-- 查看表结构
DESCRIBE check_records;

-- 查看记录
SELECT * FROM check_records ORDER BY check_time DESC LIMIT 10;

-- 查看统计
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN check_result = 1 THEN 1 ELSE 0 END) as success,
  SUM(CASE WHEN check_result = 0 THEN 1 ELSE 0 END) as failure
FROM check_records;
```

## 常见问题排查

### 1. 后端连接失败
- 检查MySQL是否在192.168.0.50:3306运行
- 检查防火墙设置
- 检查MySQL用户权限

### 2. 前端无法连接后端
- 检查后端是否在3001端口运行
- 检查网络连接
- 检查CORS设置

### 3. 数据库连接失败
```bash
# 测试数据库连接
mysql -h192.168.0.50 -uroot -p123456 -e "SELECT 1"
```

## 性能测试

### 批量数据测试
```bash
# 使用测试脚本生成大量测试数据
node generate-test-data.js
```

### 并发测试
```bash
# 使用Apache Bench测试API性能
ab -n 100 -c 10 -p test-data.json -T application/json http://192.168.0.50:3001/api/check-records
```

## 测试检查清单

- [ ] MySQL服务正常运行
- [ ] 后端API服务启动成功
- [ ] 前端应用可以访问
- [ ] Excel文件上传功能正常
- [ ] 订单核对功能正常
- [ ] 记录保存到数据库
- [ ] 记录查询功能正常
- [ ] 统计信息显示正确
- [ ] 音效播放正常
- [ ] 界面切换功能正常 