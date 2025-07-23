# Postman 测试指南

## 🚀 快速测试

### 1. 测试查询记录API

**请求信息：**
- **方法**: GET
- **URL**: `http://localhost:3001/api/check-records`
- **Headers**: 无特殊要求

**预期响应：**
```json
{
  "success": true,
  "data": [
    {
      "id": 57,
      "work_order": "WO345678",
      "tracking_number": "555555555555",
      "check_result": 1,
      "check_time": "2025-07-23T06:34:39.000Z"
    }
    // ... 更多记录
  ],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

### 2. 测试统计信息API

**请求信息：**
- **方法**: GET
- **URL**: `http://localhost:3001/api/check-records/stats`
- **Headers**: 无特殊要求

**预期响应：**
```json
{
  "success": true,
  "data": {
    "totalChecks": 57,
    "successCount": "44",
    "failureCount": "13",
    "successRate": "77.19"
  }
}
```

### 3. 测试保存记录API

**请求信息：**
- **方法**: POST
- **URL**: `http://localhost:3001/api/check-records`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "workOrder": "POSTMAN_TEST",
  "trackingNumber": "123456789012",
  "checkResult": true
}
```

**预期响应：**
```json
{
  "success": true,
  "message": "记录保存成功"
}
```

### 4. 测试带参数的查询

**请求信息：**
- **方法**: GET
- **URL**: `http://localhost:3001/api/check-records?workOrder=WO`
- **Headers**: 无特殊要求

**预期响应：**
```json
{
  "success": true,
  "data": [
    // 只包含工单号包含"WO"的记录
  ],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

## 📋 Postman 测试步骤

### 步骤1：创建新的Collection
1. 打开Postman
2. 点击"New" → "Collection"
3. 命名为"Order Check API Tests"

### 步骤2：添加测试请求

#### 请求1：查询所有记录
1. 右键Collection → "Add Request"
2. 命名为"Get All Records"
3. 方法选择"GET"
4. URL输入：`http://localhost:3001/api/check-records`
5. 点击"Send"

#### 请求2：获取统计信息
1. 右键Collection → "Add Request"
2. 命名为"Get Statistics"
3. 方法选择"GET"
4. URL输入：`http://localhost:3001/api/check-records/stats`
5. 点击"Send"

#### 请求3：保存测试记录
1. 右键Collection → "Add Request"
2. 命名为"Save Test Record"
3. 方法选择"POST"
4. URL输入：`http://localhost:3001/api/check-records`
5. Headers添加：`Content-Type: application/json`
6. Body选择"raw" → "JSON"
7. 输入：
```json
{
  "workOrder": "POSTMAN_TEST",
  "trackingNumber": "123456789012",
  "checkResult": true
}
```
8. 点击"Send"

#### 请求4：带参数查询
1. 右键Collection → "Add Request"
2. 命名为"Filter Records"
3. 方法选择"GET"
4. URL输入：`http://localhost:3001/api/check-records?workOrder=WO`
5. 点击"Send"

### 步骤3：运行所有测试
1. 右键Collection → "Run collection"
2. 选择要运行的请求
3. 点击"Run Order Check API Tests"

## 🔍 故障排除

### 问题1：连接被拒绝
- 检查后端服务是否运行：`lsof -i :3001`
- 重启后端服务：`cd backend && npm start`

### 问题2：返回空数据
- 检查数据库连接：`mysql -h192.168.0.50 -uroot -p123456 ordercheck_db -e "SELECT COUNT(*) FROM check_records;"`
- 检查表是否存在：`SHOW TABLES;`

### 问题3：SQL错误
- 检查后端日志
- 确认数据库表结构正确

## ✅ 成功标志

如果测试成功，您应该看到：
1. ✅ 查询记录返回数据（不是空数组）
2. ✅ 统计信息显示正确的数字
3. ✅ 保存记录返回成功消息
4. ✅ 参数查询能正确筛选数据

## 📊 预期数据

根据之前的测试，您应该看到：
- 总记录数：约57条
- 成功次数：约44次
- 失败次数：约13次
- 成功率：约77.19% 