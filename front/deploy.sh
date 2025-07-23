#!/bin/bash

echo "🚀 Frontend 部署脚本"
echo "===================="

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose 未安装，请先安装 docker-compose"
    exit 1
fi

# 停止现有容器
echo "🛑 停止现有容器..."
docker-compose down

# 构建并启动
echo "🔨 构建并启动前端服务..."
docker-compose up --build -d

echo "✅ 前端部署完成！"
echo "🌐 前端地址: http://localhost:1100"
echo ""
echo "📋 查看服务状态: docker-compose ps"
echo "📋 查看日志: docker-compose logs -f" 