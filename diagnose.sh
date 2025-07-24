#!/bin/bash

echo "🔍 Docker 容器诊断"
echo "=================="

echo "1. 检查容器状态..."
cd backend && docker-compose ps

echo -e "\n2. 检查容器日志..."
docker-compose logs --tail=20 backend

echo -e "\n3. 检查端口监听..."
netstat -tlnp | grep 1110 || echo "   端口1110未监听"

echo -e "\n4. 检查Docker网络..."
docker network ls

echo -e "\n5. 检查容器内部进程..."
docker-compose exec backend ps aux || echo "   无法进入容器"

echo -e "\n6. 测试本地连接..."
curl -v http://localhost:1110/health 2>&1 || echo "   本地连接失败"

echo -e "\n7. 检查防火墙..."
sudo iptables -L | grep 1110 || echo "   防火墙规则中无1110端口"

echo -e "\n诊断完成！" 