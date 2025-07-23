const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('开始测试API...\n');

  try {
    // 测试1: 保存记录
    console.log('1. 测试保存记录...');
    const saveResponse = await fetch(`${API_BASE_URL}/check-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workOrder: 'TEST001',
        trackingNumber: '123456789012',
        checkResult: true
      })
    });
    
    const saveResult = await saveResponse.json();
    console.log('保存记录结果:', saveResult);

    // 测试2: 查询记录
    console.log('\n2. 测试查询记录...');
    const queryResponse = await fetch(`${API_BASE_URL}/check-records?page=1&limit=10`);
    const queryResult = await queryResponse.json();
    console.log('查询记录结果:', queryResult);

    // 测试3: 获取统计信息
    console.log('\n3. 测试获取统计信息...');
    const statsResponse = await fetch(`${API_BASE_URL}/check-records/stats`);
    const statsResult = await statsResponse.json();
    console.log('统计信息结果:', statsResult);

    console.log('\n✅ 所有API测试完成！');

  } catch (error) {
    console.error('❌ API测试失败:', error.message);
  }
}

testAPI(); 