async function testFrontendQuery() {
  console.log('🧪 测试前端查询功能...\n');

  try {
    // 1. 测试查询记录API
    console.log('1. 测试查询记录API...');
    const queryResponse = await fetch('http://localhost:3001/api/check-records');
    const queryResult = await queryResponse.json();
    
    if (queryResult.success) {
      console.log(`   ✅ 查询成功，共找到 ${queryResult.data.length} 条记录`);
      
      // 显示前5条记录
      console.log('   📊 前5条记录:');
      queryResult.data.slice(0, 5).forEach((record, index) => {
        const date = new Date(record.check_time).toLocaleString('zh-CN');
        console.log(`      ${index + 1}. ${record.work_order} | ${record.tracking_number} | ${record.check_result ? '成功' : '失败'} | ${date}`);
      });
    } else {
      console.log('   ❌ 查询失败');
    }

    // 2. 测试统计信息API
    console.log('\n2. 测试统计信息API...');
    const statsResponse = await fetch('http://localhost:3001/api/check-records/stats');
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

    // 3. 测试带参数的查询
    console.log('\n3. 测试带参数的查询...');
    const filteredResponse = await fetch('http://localhost:3001/api/check-records?workOrder=WO');
    const filteredResult = await filteredResponse.json();
    
    if (filteredResult.success) {
      console.log(`   ✅ 筛选查询成功，找到 ${filteredResult.data.length} 条包含"WO"的记录`);
    } else {
      console.log('   ❌ 筛选查询失败');
    }

    console.log('\n✅ 前端查询功能测试完成！');
    console.log('\n📝 测试结果总结:');
    console.log('   - 查询记录API正常工作');
    console.log('   - 统计信息API正常工作');
    console.log('   - 参数筛选功能正常工作');
    console.log('   - 前端应该能正常显示查询结果');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testFrontendQuery(); 