#!/bin/bash

echo "🚀 订单核对系统部署脚本 (Host模式)"
echo "=================================="

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
    echo "📱 前端地址: http://宿主机IP:1100"
    echo "🔗 后端API: http://宿主机IP:1110"
    echo "🗄️  数据库: 192.168.0.50:3306"
    echo ""
    echo "💡 外网访问说明:"
    echo "   - 确保宿主机IP的1100和1110端口已对外开放"
    echo "   - 前端通过Nginx代理访问后端API"
    echo "   - 所有API请求都会自动转发到后端"
else
    echo "❌ 无效参数"
    echo "用法: ./deploy-all.sh [backend|frontend|all]"
    echo "  backend  - 仅部署后端"
    echo "  frontend - 仅部署前端"
    echo "  all      - 部署全部服务 (默认)"
    exit 1
fi 