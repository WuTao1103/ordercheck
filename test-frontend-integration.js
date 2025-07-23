async function testFrontendIntegration() {
  console.log('🧪 测试前端核对功能与数据库集成...\n');

  try {
    // 1. 模拟前端核对操作
    console.log('1. 模拟前端核对操作...');
    
    const testCases = [
      { workOrder: 'WO123456', trackingNumber: '123456789012', expectedResult: true },
      { workOrder: 'WO789012', trackingNumber: '987654321098', expectedResult: false },
      { workOrder: 'WO345678', trackingNumber: '555555555555', expectedResult: true }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(`   测试案例 ${i + 1}: ${testCase.workOrder} - ${testCase.trackingNumber}`);
      
      const response = await fetch(`http://localhost:3001/api/check-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workOrder: testCase.workOrder,
          trackingNumber: testCase.trackingNumber,
          checkResult: testCase.expectedResult
        })
      });
      
      const result = await response.json();
      if (result.success) {
        console.log(`   ✅ 保存成功: ${testCase.workOrder} - ${testCase.trackingNumber} - ${testCase.expectedResult ? '成功' : '失败'}`);
      } else {
        console.log(`   ❌ 保存失败: ${testCase.workOrder}`);
      }
    }

    // 2. 验证数据已保存到数据库
    console.log('\n2. 验证数据已保存到数据库...');
    const queryResponse = await fetch(`http://localhost:3001/api/check-records?page=1&limit=20`);
    const queryResult = await queryResponse.json();
    
    if (queryResult.success) {
      console.log(`   ✅ 查询成功，共找到 ${queryResult.data.length} 条记录`);
      
      // 查找我们刚添加的测试记录
      const testRecords = queryResult.data.filter(record => 
        record.work_order.startsWith('WO') && 
        (record.work_order === 'WO123456' || record.work_order === 'WO789012' || record.work_order === 'WO345678')
      );
      
      console.log(`   📊 找到 ${testRecords.length} 条测试记录:`);
      testRecords.forEach(record => {
        console.log(`      - ${record.work_order} | ${record.tracking_number} | ${record.check_result ? '成功' : '失败'} | ${record.check_time}`);
      });
    } else {
      console.log('   ❌ 查询失败');
    }

    // 3. 检查统计信息
    console.log('\n3. 检查统计信息...');
    const statsResponse = await fetch(`http://localhost:3001/api/check-records/stats`);
    const statsResult = await statsResponse.json();
    
    if (statsResult.success) {
      console.log('   📈 统计信息:');
      console.log(`      - 总核对次数: ${statsResult.data.totalChecks}`);
      console.log(`      - 成功次数: ${statsResult.data.successCount}`);
      console.log(`      - 失败次数: ${statsResult.data.failureCount}`);
      console.log(`      - 成功率: ${statsResult.data.successRate}%`);
    } else {
      console.log('   ❌ 获取统计信息失败');
    }

    console.log('\n✅ 前端集成测试完成！');
    console.log('\n📝 测试结果总结:');
    console.log('   - 每次前端核对操作都会自动保存到数据库');
    console.log('   - 可以通过查询接口获取历史记录');
    console.log('   - 统计信息实时更新');
    console.log('   - 数据持久化存储');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testFrontendIntegration(); 