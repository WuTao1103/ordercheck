#!/bin/bash

echo "🚀 Order Check 部署脚本"
echo "========================"

# 检查参数
if [ "$1" = "docker" ]; then
    echo "📦 使用 Docker 部署..."
    
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
    echo "🔨 构建并启动容器..."
    docker-compose up --build -d
    
    echo "✅ 部署完成！"
    echo "🌐 前端地址: http://localhost:1100"
    echo "🔧 后端API: http://localhost:1059/api"
    echo "🗄️  MySQL: localhost:3306"
    
elif [ "$1" = "local" ]; then
    echo "💻 使用本地开发环境..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装，请先安装 Node.js"
        exit 1
    fi
    
    # 安装依赖
    echo "📦 安装前端依赖..."
    cd front && npm install && cd ..
    
    echo "📦 安装后端依赖..."
    cd backend && npm install && cd ..
    
    echo "✅ 依赖安装完成！"
    echo "🚀 请分别启动服务："
    echo "   后端: cd backend && npm start"
    echo "   前端: cd front && npm start"
    
else
    echo "❌ 请指定部署方式："
    echo "   ./deploy.sh docker  # Docker 部署"
    echo "   ./deploy.sh local   # 本地开发"
    exit 1
fi 