const mysql = require('mysql2/promise');

console.log('🔍 测试NAS服务器连接...\n');

async function testNASConnection() {
  const dbConfig = {
    host: '192.168.0.50',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'ordercheck_db'
  };

  try {
    console.log('1. 测试数据库连接...');
    console.log(`   连接地址: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`   数据库: ${dbConfig.database}`);
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('   ✅ 数据库连接成功！');
    
    // 测试查询
    console.log('\n2. 测试数据库查询...');
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM check_records');
    console.log(`   ✅ 查询成功，记录数: ${rows[0].count}`);
    
    // 测试表结构
    console.log('\n3. 检查表结构...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('   📋 数据库中的表:');
    tables.forEach(table => {
      console.log(`      - ${Object.values(table)[0]}`);
    });
    
    await connection.end();
    console.log('\n✅ NAS连接测试完成！');
    
  } catch (error) {
    console.error('❌ 连接失败:', error.message);
    console.log('\n🔧 可能的解决方案:');
    console.log('   1. 检查NAS服务器IP是否正确');
    console.log('   2. 检查MySQL服务是否运行');
    console.log('   3. 检查用户名密码是否正确');
    console.log('   4. 检查防火墙设置');
  }
}

testNASConnection(); 