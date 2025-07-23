#!/bin/bash

echo "启动Order Check应用..."

# 检查MySQL是否运行
echo "检查MySQL服务..."
if ! mysqladmin ping -h"192.168.0.50" -P"3306" -u"root" -p"123456" --silent; then
    echo "MySQL未运行，请先启动MySQL服务"
    echo "可以使用以下命令启动MySQL:"
    echo "brew services start mysql"
    echo "或者使用Docker: docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0"
    exit 1
fi

# 启动后端服务
echo "启动后端服务..."
cd backend
npm install
npm start &
BACKEND_PID=$!

# 等待后端服务启动
echo "等待后端服务启动..."
sleep 5

# 启动前端服务
echo "启动前端服务..."
cd ..
npm start

# 清理
trap "kill $BACKEND_PID" EXIT 