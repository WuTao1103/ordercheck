# Order Check 部署指南

## 📋 项目结构

```
ordercheck/
├── backend/                  # 后端服务
│   ├── docker-compose.yml   # 后端 Docker 配置
│   ├── deploy.sh            # 后端部署脚本
│   ├── server.js            # Express 服务器
│   └── Dockerfile           # 后端 Docker 镜像
├── front/                    # 前端服务
│   ├── docker-compose.yml   # 前端 Docker 配置
│   ├── deploy.sh            # 前端部署脚本
│   ├── src/                 # React 源码
│   └── Dockerfile           # 前端 Docker 镜像
├── deploy-all.sh            # 总部署脚本
└── docker-compose.yml       # 完整部署配置（可选）
```

## 🚀 部署方式

### 方式一：分别部署（推荐）

#### 1. 部署后端
```bash
cd backend
./deploy.sh
```

#### 2. 部署前端
```bash
cd front
./deploy.sh
```

### 方式二：使用总部署脚本

```bash
# 部署所有服务
./deploy-all.sh all

# 只部署后端
./deploy-all.sh backend

# 只部署前端
./deploy-all.sh frontend
```

### 方式三：使用完整配置（可选）

```bash
# 使用根目录的 docker-compose.yml
docker-compose up --build -d
```

## 🌐 访问地址

- **前端**：http://localhost:1100
- **后端API**：http://localhost:1110/api
- **MySQL**：连接到服务器上的localhost:3306

## 🔧 管理命令

### 查看服务状态
```bash
# 后端服务状态
cd backend && docker-compose ps

# 前端服务状态
cd front && docker-compose ps
```

### 查看日志
```bash
# 后端日志
cd backend && docker-compose logs -f

# 前端日志
cd front && docker-compose logs -f
```

### 停止服务
```bash
# 停止后端
cd backend && docker-compose down

# 停止前端
cd front && docker-compose down
```

## 📊 服务配置

### 后端服务 (backend/)
- **端口**：1110
- **数据库**：连接到服务器上的MySQL 3306端口
- **环境变量**：
  - `NODE_ENV=production`
  - `DB_HOST=host.docker.internal`

### 前端服务 (front/)
- **端口**：1100
- **Web服务器**：Nginx
- **环境变量**：
  - `NODE_ENV=production`

## 🔍 故障排除

### 1. 端口冲突
如果端口被占用，可以修改 `docker-compose.yml` 中的端口映射：
```yaml
ports:
  - "新端口:容器端口"
```

### 2. 数据库连接失败
检查后端服务的 `DB_HOST` 环境变量是否正确设置为 `mysql`。

### 3. 前端无法访问后端API
确保前端的 `API_BASE_URL` 指向正确的后端地址。

## 📝 注意事项

1. **首次部署**：需要构建 Docker 镜像，可能需要几分钟时间
2. **数据持久化**：MySQL 数据会保存在 Docker volume 中
3. **网络隔离**：前端和后端使用独立的网络，提高安全性
4. **独立扩展**：可以单独扩展前端或后端服务 