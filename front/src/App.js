import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import * as XLSX from 'xlsx';
import successSound from './sounds/success.wav';
import errorSound from './sounds/error.wav';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [workOrder, setWorkOrder] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showRecords, setShowRecords] = useState(false);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({});
  const [searchParams, setSearchParams] = useState({
    workOrder: '',
    trackingNumber: '',
    startDate: '',
    endDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const trackingNumberRef = useRef(null);
  const workOrderRef = useRef(null);

  // API基础URL
  const API_BASE_URL = '/api';

  // 语言切换函数
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // 保存核对记录到数据库
  const saveCheckRecord = async (workOrder, trackingNumber, checkResult) => {
    try {
      const response = await fetch(`${API_BASE_URL}/check-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workOrder,
          trackingNumber,
          checkResult
        })
      });
      
      if (!response.ok) {
        console.error('保存记录失败');
      }
    } catch (error) {
      console.error('保存记录出错:', error);
    }
  };

  // 查询记录
  const fetchRecords = async (page = 1) => {
    try {
      console.log('开始查询记录...'); // 调试日志
      
      // 简化参数，只传递必要的参数
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20'
      });
      
      // 如果有搜索条件，添加到参数中
      if (searchParams.workOrder) {
        params.append('workOrder', searchParams.workOrder);
      }
      if (searchParams.trackingNumber) {
        params.append('trackingNumber', searchParams.trackingNumber);
      }
      if (searchParams.startDate) {
        params.append('startDate', searchParams.startDate);
      }
      if (searchParams.endDate) {
        params.append('endDate', searchParams.endDate);
      }
      
      const url = `${API_BASE_URL}/check-records?${params}`;
      console.log('请求URL:', url); // 调试日志
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API响应:', data); // 调试日志
      
      if (data.success) {
        setRecords(data.data);
        setCurrentPage(page);
        console.log('设置记录成功，记录数:', data.data.length); // 调试日志
      } else {
        console.error('API返回失败:', data.message);
      }
    } catch (error) {
      console.error('查询记录失败:', error);
    }
  };

  // 获取统计信息
  const fetchStats = async () => {
    try {
      console.log('开始获取统计信息...'); // 调试日志
      
      const params = new URLSearchParams();
      
      if (searchParams.startDate) {
        params.append('startDate', searchParams.startDate);
      }
      if (searchParams.endDate) {
        params.append('endDate', searchParams.endDate);
      }
      
      const url = `${API_BASE_URL}/check-records/stats?${params}`;
      console.log('统计信息请求URL:', url); // 调试日志
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('统计信息响应:', data); // 调试日志
      
      if (data.success) {
        setStats(data.data);
        console.log('设置统计信息成功'); // 调试日志
      } else {
        console.error('获取统计信息失败:', data.message);
      }
    } catch (error) {
      console.error('获取统计信息失败:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setTodos(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const incompleteCount = totalCount - completedCount;
  const completionPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  const handleCheck = async (trackingNum) => {
    const matchIndex = todos.findIndex(todo => todo['寄修单号'] === workOrder && todo['跟踪号'] === trackingNum);
    const checkResult = matchIndex !== -1;
    
    if (checkResult) {
      const newTodos = [...todos];
      newTodos[matchIndex].completed = true;
      setTodos(newTodos);
      new Audio(successSound).play();
    } else {
      new Audio(errorSound).play();
    }

    // 保存记录到数据库
    await saveCheckRecord(workOrder, trackingNum, checkResult);
    
    setWorkOrder('');
    setTrackingNumber('');
    workOrderRef.current.focus();
  };

  const handleWorkOrderKeyDown = (e) => {
    if (e.key === 'Enter') {
      trackingNumberRef.current.focus();
    }
  };

  const handleTrackingNumberKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 只取后面12位
      const last12Digits = trackingNumber.slice(-12);
      console.log('截取的后12位跟踪号:', last12Digits); // 调试输出
      // 使用截取后的值进行核对
      handleCheck(last12Digits);
      // 清空输入框并重置状态
      setTrackingNumber('');
    }
  };

  const handleSearchRecords = () => {
    fetchRecords(1);
    fetchStats();
  };

  const handlePageChange = (page) => {
    fetchRecords(page);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  // 导出Excel函数
  const exportToExcel = (data) => {
    if (!data || data.length === 0) {
      alert(t('noDataToExport'));
      return;
    }
    // 处理数据格式
    const exportData = data.map(item => ({
      [t('workOrderLabel')]: item.work_order,
      [t('trackingNumberLabel')]: item.tracking_number,
      [t('checkResult')]: item.check_result ? t('success') : t('failure'),
      [t('checkTime')]: formatDate(item.check_time)
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t('checkRecords'));
    XLSX.writeFile(workbook, `${t('checkRecords')}.xlsx`);
  };

  // 导出主页面Excel函数
  const exportTodosToExcel = () => {
    if (!todos || todos.length === 0) {
      alert(t('noDataToExport'));
      return;
    }
    const exportData = todos.map(item => ({
      [t('workOrderLabel')]: item['寄修单号'],
      [t('trackingNumberLabel')]: item['跟踪号'],
      [t('completionStatus')]: item.completed ? t('completed') : t('notCompleted')
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t('pendingCheckList'));
    XLSX.writeFile(workbook, `${t('pendingCheckList')}.xlsx`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{t('title')}</h1>
        
        {/* 语言切换按钮 */}
        <div className="language-switcher">
          <button 
            onClick={() => changeLanguage('zh')}
            className={`language-button ${i18n.language === 'zh' ? 'active' : 'inactive'}`}
          >
            {t('chinese')}
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className={`language-button ${i18n.language === 'en' ? 'active' : 'inactive'}`}
          >
            {t('english')}
          </button>
        </div>
        
        {/* 主功能区域 */}
        <div style={{ display: showRecords ? 'none' : 'block' }}>
          <input 
            type="file" 
            accept=".xlsx" 
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" style={{
            background: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'inline-block',
            margin: '10px'
          }}>
            {t('selectFile')}
          </label>
          <div>
            <p>{t('totalItems')}: {totalCount}</p>
            <p>{t('completedItems')}: {completedCount}</p>
            <p>{t('incompleteItems')}: {incompleteCount}</p>
            <p>{t('completionPercentage')}: {completionPercentage.toFixed(2)}%</p>
          </div>
          <div>
            <button onClick={() => setFilter('all')}>{t('all')}</button>
            <button onClick={() => setFilter('completed')}>{t('completed')}</button>
            <button onClick={() => setFilter('incomplete')}>{t('incomplete')}</button>
            <button onClick={() => exportTodosToExcel()} style={{ marginLeft: '10px' }}>{t('exportExcel')}</button>
          </div>
          <div>
            <input
              type="text"
              placeholder={t('workOrderPlaceholder')}
              value={workOrder}
              onChange={(e) => setWorkOrder(e.target.value)}
              onKeyDown={handleWorkOrderKeyDown}
              ref={workOrderRef}
            />
            <input
              type="text"
              placeholder={t('trackingNumberPlaceholder')}
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={handleTrackingNumberKeyDown}
              ref={trackingNumberRef}
            />
            <button onClick={() => handleCheck(trackingNumber)}>{t('check')}</button>
          </div>
          <ul>
            {filteredTodos.map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed || false}
                  onChange={() => toggleComplete(index)}
                />
                {todo[t('repairOrderNumber')] || todo['寄修单号']} - {todo[t('trackingNumberField')] || todo['跟踪号']}
                <button onClick={() => deleteTodo(index)}>{t('delete')}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* 查询记录区域 */}
        <div style={{ display: showRecords ? 'block' : 'none' }}>
          <h2>{t('queryRecords')}</h2>
          
          {/* 搜索条件 */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder={t('workOrder')}
              value={searchParams.workOrder}
              onChange={(e) => setSearchParams({...searchParams, workOrder: e.target.value})}
            />
            <input
              type="text"
              placeholder={t('trackingNumber')}
              value={searchParams.trackingNumber}
              onChange={(e) => setSearchParams({...searchParams, trackingNumber: e.target.value})}
            />
            <input
              type="date"
              value={searchParams.startDate}
              onChange={(e) => setSearchParams({...searchParams, startDate: e.target.value})}
            />
            <input
              type="date"
              value={searchParams.endDate}
              onChange={(e) => setSearchParams({...searchParams, endDate: e.target.value})}
            />
            <button onClick={handleSearchRecords}>{t('search')}</button>
            <button onClick={() => exportToExcel(records)} style={{ marginLeft: '10px' }}>{t('exportExcel')}</button>
          </div>

          {/* 统计信息 */}
          {stats.totalChecks > 0 && (
            <div style={{ marginBottom: '20px', padding: '10px' }}>
              <p>{t('totalChecks')}: {stats.totalChecks}</p>
              <p>{t('successCount')}: {stats.successCount}</p>
              <p>{t('failureCount')}: {stats.failureCount}</p>
              <p>{t('successRate')}: {stats.successRate}%</p>
            </div>
          )}

          {/* 记录列表 */}
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>{t('workOrder')}</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>{t('trackingNumber')}</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>{t('checkResult')}</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>{t('checkTime')}</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.work_order}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.tracking_number}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', color: record.check_result ? 'green' : 'red' }}>
                      {record.check_result ? t('success') : t('failure')}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatDate(record.check_time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 切换按钮 */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => {
            if (!showRecords) {
              // 切换到查询记录界面时，自动加载数据
              setShowRecords(true);
              fetchRecords(1);
              fetchStats();
            } else {
              setShowRecords(false);
            }
          }}>
            {showRecords ? t('backToMain') : t('viewRecords')}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
