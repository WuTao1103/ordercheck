#!/bin/bash

echo "🚀 部署前端服务 (端口1100)..."

# 停止并删除现有容器
docker-compose down

# 重新构建并启动
docker-compose up --build -d

echo "✅ 前端服务部署完成！"
echo "📱 访问地址: http://192.168.0.50:1100"
echo "🔗 API地址: http://192.168.0.50:1110"
echo ""
echo "📋 管理命令:"
echo "   查看日志: cd front && docker-compose logs -f"
echo "   停止服务: cd front && docker-compose down"
echo "   重启服务: cd front && docker-compose restart" 