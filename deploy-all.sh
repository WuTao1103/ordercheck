#!/bin/bash

echo "🚀 Order Check 完整部署脚本"
echo "============================"

# 检查参数
if [ "$1" = "backend" ]; then
    echo "📦 部署后端服务..."
    cd backend
    chmod +x deploy.sh
    ./deploy.sh
    cd ..
    
elif [ "$1" = "frontend" ]; then
    echo "📦 部署前端服务..."
    cd front
    chmod +x deploy.sh
    ./deploy.sh
    cd ..
    
elif [ "$1" = "all" ]; then
    echo "📦 部署所有服务..."
    
    echo "🔧 部署后端..."
    cd backend
    chmod +x deploy.sh
    ./deploy.sh
    cd ..
    
    echo "🌐 部署前端..."
    cd front
    chmod +x deploy.sh
    ./deploy.sh
    cd ..
    
    echo "✅ 所有服务部署完成！"
    echo "🌐 前端地址: http://localhost:1100"
    echo "🔧 后端API: http://localhost:1110/api"
    echo "🗄️  MySQL: localhost:3306"
    
else
    echo "❌ 请指定部署方式："
    echo "   ./deploy-all.sh backend   # 只部署后端"
    echo "   ./deploy-all.sh frontend  # 只部署前端"
    echo "   ./deploy-all.sh all       # 部署所有服务"
    exit 1
fi 