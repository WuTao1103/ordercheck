async function testFrontendAPI() {
  console.log('🧪 测试前端API调用...\n');

  try {
    // 模拟前端的查询记录调用
    console.log('1. 测试查询记录（模拟前端调用）...');
    
    const params = new URLSearchParams({
      page: '1',
      limit: '20'
    });
    
    const url = `http://localhost:1110/api/check-records?${params}`;
    console.log('请求URL:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('响应状态:', response.status);
    console.log('响应数据:', data);
    
    if (data.success) {
      console.log(`✅ 查询成功，记录数: ${data.data.length}`);
      console.log('前3条记录:');
      data.data.slice(0, 3).forEach((record, index) => {
        console.log(`   ${index + 1}. ${record.work_order} | ${record.tracking_number} | ${record.check_result ? '成功' : '失败'}`);
      });
    } else {
      console.log('❌ 查询失败:', data.message);
    }

    // 模拟前端的统计信息调用
    console.log('\n2. 测试统计信息（模拟前端调用）...');
    
    const statsUrl = 'http://localhost:1110/api/check-records/stats';
    console.log('统计信息URL:', statsUrl);
    
    const statsResponse = await fetch(statsUrl);
    const statsData = await statsResponse.json();
    
    console.log('统计信息响应:', statsData);
    
    if (statsData.success) {
      console.log('✅ 统计信息获取成功');
      console.log(`   - 总核对次数: ${statsData.data.totalChecks}`);
      console.log(`   - 成功率: ${statsData.data.successRate}%`);
    } else {
      console.log('❌ 统计信息获取失败:', statsData.message);
    }

    console.log('\n✅ 前端API调用测试完成！');
    console.log('\n📝 如果上面的测试都成功，但前端界面还是查不到数据，问题可能是：');
    console.log('   1. 前端状态管理问题');
    console.log('   2. 前端组件渲染问题');
    console.log('   3. 浏览器缓存问题');
    console.log('   4. 前端路由问题');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testFrontendAPI(); 