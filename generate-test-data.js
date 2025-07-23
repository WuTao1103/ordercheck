const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3001/api';

// 生成随机工单号
function generateWorkOrder() {
  return 'WO' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

// 生成随机跟踪号
function generateTrackingNumber() {
  return Math.random().toString().substr(2, 12);
}

// 生成测试数据
async function generateTestData(count = 50) {
  console.log(`开始生成 ${count} 条测试数据...\n`);

  const promises = [];
  
  for (let i = 0; i < count; i++) {
    const workOrder = generateWorkOrder();
    const trackingNumber = generateTrackingNumber();
    const checkResult = Math.random() > 0.3; // 70%成功率
    
    const promise = fetch(`${API_BASE_URL}/check-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workOrder,
        trackingNumber,
        checkResult
      })
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          console.log(`✅ 记录 ${i + 1}: ${workOrder} - ${trackingNumber} - ${checkResult ? '成功' : '失败'}`);
        } else {
          console.log(`❌ 记录 ${i + 1} 保存失败`);
        }
      })
      .catch(error => {
        console.log(`❌ 记录 ${i + 1} 出错: ${error.message}`);
      });

    promises.push(promise);
    
    // 添加延迟避免请求过快
    if (i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  await Promise.all(promises);
  console.log('\n✅ 测试数据生成完成！');
  
  // 显示统计信息
  console.log('\n📊 查询统计信息...');
  try {
    const statsResponse = await fetch(`${API_BASE_URL}/check-records/stats`);
    const stats = await statsResponse.json();
    if (stats.success) {
      console.log('统计结果:', stats.data);
    }
  } catch (error) {
    console.log('获取统计信息失败:', error.message);
  }
}

// 运行测试数据生成
generateTestData(50); 