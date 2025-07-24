const net = require('net');

console.log('🌐 测试网络连接...\n');

function testConnection(host, port, description) {
  return new Promise((resolve) => {
    const client = new net.Socket();
    const timeout = 5000; // 5秒超时
    
    client.setTimeout(timeout);
    
    client.connect(port, host, () => {
      console.log(`   ✅ ${description} 连接成功`);
      client.destroy();
      resolve(true);
    });
    
    client.on('timeout', () => {
      console.log(`   ⏰ ${description} 连接超时`);
      client.destroy();
      resolve(false);
    });
    
    client.on('error', (err) => {
      console.log(`   ❌ ${description} 连接失败: ${err.message}`);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('1. 测试NAS服务器网络连接...');
  await testConnection('192.168.0.50', 3306, 'MySQL端口(3306)');
  
  console.log('\n2. 测试本地端口...');
  await testConnection('localhost', 1110, '本地API端口(1110)');
  
  console.log('\n3. 测试NAS API端口...');
  await testConnection('192.168.0.50', 1110, 'NAS API端口(1110)');
  
  console.log('\n📋 测试完成！');
  console.log('如果MySQL连接失败，请检查：');
  console.log('   - NAS服务器是否开机');
  console.log('   - MySQL服务是否运行');
  console.log('   - 防火墙是否允许3306端口');
  console.log('   - 网络是否可达');
}

runTests(); 