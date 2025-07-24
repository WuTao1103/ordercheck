#!/bin/bash

echo "🔨 测试前端构建..."

cd front

echo "1. 清理node_modules..."
rm -rf node_modules package-lock.json

echo "2. 重新安装依赖..."
npm install

echo "3. 构建前端..."
npm run build

echo "4. 检查构建文件..."
ls -la build/

echo "5. 检查静态资源..."
ls -la build/static/

echo "✅ 前端构建测试完成！" 