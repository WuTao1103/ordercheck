FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# 调试：显示构建结果
RUN ls -la build/
RUN ls -la build/static/ || echo "static目录不存在"

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 调试：显示nginx配置
RUN cat /etc/nginx/conf.d/default.conf

EXPOSE 1100
CMD ["nginx", "-g", "daemon off;"]