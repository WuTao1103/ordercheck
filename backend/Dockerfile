FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 1110

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=1110

CMD ["node", "server.js"] 