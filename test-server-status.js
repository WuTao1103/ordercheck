const http = require('http');

console.log('🔍 测试服务器连接状态...\n');

// 测试健康检查
function testHealth() {
  console.log('1. 测试健康检查...');
  const req = http.request({
    hostname: '192.168.0.50',
    port: 1110,
    path: '/health',
    method: 'GET'
  }, (res) => {
    console.log(`   状态码: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log(`   响应: ${data}`);
    });
  });
  
  req.on('error', (err) => {
    console.log(`   ❌ 连接失败: ${err.message}`);
  });
  
  req.end();
}

// 测试API
function testAPI() {
  console.log('\n2. 测试API...');
  const req = http.request({
    hostname: '192.168.0.50',
    port: 1110,
    path: '/api/check-records',
    method: 'GET'
  }, (res) => {
    console.log(`   状态码: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log(`   响应: ${data}`);
    });
  });
  
  req.on('error', (err) => {
    console.log(`   ❌ 连接失败: ${err.message}`);
  });
  
  req.end();
}

// 测试端口是否开放
function testPort() {
  console.log('\n3. 测试端口连接...');
  const net = require('net');
  const client = new net.Socket();
  
  client.connect(1110, '192.168.0.50', () => {
    console.log('   ✅ 端口1110可以连接');
    client.destroy();
  });
  
  client.on('error', (err) => {
    console.log(`   ❌ 端口1110连接失败: ${err.message}`);
  });
}

// 运行测试
testPort();
setTimeout(testHealth, 1000);
setTimeout(testAPI, 2000); 