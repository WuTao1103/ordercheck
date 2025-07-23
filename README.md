# Order Check - 订单核对系统

这是一个用于订单核对和记录查询的React应用程序。

## 功能特性

### 主要功能
- **Excel文件上传**: 支持上传.xlsx格式的订单文件
- **订单核对**: 输入工单号和运输单号进行核对
- **任务管理**: 显示完成进度和统计信息
- **音效反馈**: 核对成功/失败时播放音效

### 新增功能 - 查询记录
- **记录保存**: 自动保存每次核对记录到MySQL数据库
- **记录查询**: 支持按工单号、跟踪号、时间范围查询
- **统计信息**: 显示核对成功率、总次数等统计
- **分页显示**: 支持分页查看历史记录

## 技术栈

### 前端
- React 19.1.0
- xlsx (Excel文件处理)
- ajv (JSON验证)

### 后端
- Node.js + Express
- MySQL 8.0
- mysql2 (数据库驱动)

## 快速开始

### 方式一：使用Docker（推荐）

```bash
# 启动所有服务
docker-compose up -d

# 访问应用
# 前端: http://localhost:1037
# 后端API: http://localhost:3001
# MySQL: localhost:3306
```

### 方式二：本地开发

1. **启动MySQL服务**
```bash
# macOS (使用Homebrew)
brew services start mysql

# 或者使用Docker
docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0
```

2. **启动应用**
```bash
# 使用启动脚本
./start.sh

# 或者手动启动
# 启动后端
cd backend
npm install
npm start

# 启动前端（新终端）
npm start
```

## 数据库配置

- **主机**: 192.168.0.50
- **端口**: 3306
- **用户名**: root
- **密码**: 123456
- **数据库**: ordercheck_db

数据库和表会在首次启动时自动创建。

## API接口

### 保存核对记录
```
POST /api/check-records
Content-Type: application/json

{
  "workOrder": "工单号",
  "trackingNumber": "跟踪号", 
  "checkResult": true/false
}
```

### 查询记录
```
GET /api/check-records?workOrder=xxx&trackingNumber=xxx&startDate=2024-01-01&endDate=2024-12-31&page=1&limit=20
```

### 获取统计信息
```
GET /api/check-records/stats?startDate=2024-01-01&endDate=2024-12-31
```

## 使用说明

1. **上传Excel文件**: 点击文件上传按钮，选择包含订单信息的.xlsx文件
2. **核对订单**: 
   - 输入工单号，按Enter键切换到跟踪号输入框
   - 输入跟踪号，按Enter键进行核对
   - 系统会自动截取跟踪号后12位进行匹配
3. **查看记录**: 点击"查看记录"按钮切换到记录查询界面
4. **查询历史**: 在查询界面可以按条件筛选历史记录

## 开发

### 可用脚本

```bash
# 前端
npm start          # 启动开发服务器
npm run build      # 构建生产版本
npm test           # 运行测试

# 后端
cd backend
npm start          # 启动后端服务
npm run dev        # 开发模式（自动重启）
```

## 部署

使用Docker Compose进行生产环境部署：

```bash
docker-compose up -d
```

应用将在以下端口运行：
- 前端: http://localhost:1037
- 后端API: http://localhost:3001
- MySQL: localhost:3306
