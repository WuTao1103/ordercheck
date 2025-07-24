#!/bin/bash

echo "🚀 订单核对系统部署脚本"
echo "========================"

# 检查参数
if [ "$1" = "backend" ]; then
    echo "🔧 部署后端服务..."
    cd backend && ./deploy.sh
elif [ "$1" = "frontend" ]; then
    echo "🎨 部署前端服务..."
    cd front && ./deploy.sh
elif [ "$1" = "all" ] || [ -z "$1" ]; then
    echo "🔧 部署后端服务..."
    cd backend && ./deploy.sh
    
    echo ""
    echo "🎨 部署前端服务..."
    cd ../front && ./deploy.sh
    
    echo ""
    echo "✅ 全部服务部署完成！"
    echo "📱 前端地址: http://192.168.0.50:1100"
    echo "🔗 后端API: http://192.168.0.50:1110"
    echo "🗄️  数据库: 192.168.0.50:3306"
else
    echo "❌ 无效参数"
    echo "用法: ./deploy-all.sh [backend|frontend|all]"
    echo "  backend  - 仅部署后端"
    echo "  frontend - 仅部署前端"
    echo "  all      - 部署全部服务 (默认)"
    exit 1
fi 