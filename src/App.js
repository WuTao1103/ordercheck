import React, { useState, useRef } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import successSound from './sounds/success.wav';
import errorSound from './sounds/error.wav';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [workOrder, setWorkOrder] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const trackingNumberRef = useRef(null);
  const workOrderRef = useRef(null);

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

  const handleCheck = (trackingNum) => {
    const matchIndex = todos.findIndex(todo => todo['寄修单号'] === workOrder && todo['跟踪号'] === trackingNum);
    if (matchIndex !== -1) {
      const newTodos = [...todos];
      newTodos[matchIndex].completed = true;
      setTodos(newTodos);
      new Audio(successSound).play();
    } else {
      new Audio(errorSound).play();
    }
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Order Check</h1>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        <div>
          <p>总事项数: {totalCount}</p>
          <p>已完成数: {completedCount}</p>
          <p>未完成数: {incompleteCount}</p>
          <p>完成百分比: {completionPercentage.toFixed(2)}%</p>
        </div>
        <div>
          <button onClick={() => setFilter('all')}>全部</button>
          <button onClick={() => setFilter('completed')}>已完成</button>
          <button onClick={() => setFilter('incomplete')}>未完成</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="输入工单号"
            value={workOrder}
            onChange={(e) => setWorkOrder(e.target.value)}
            onKeyDown={handleWorkOrderKeyDown}
            ref={workOrderRef}
          />
          <input
            type="text"
            placeholder="输入运输单号"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            onKeyDown={handleTrackingNumberKeyDown}
            ref={trackingNumberRef}
          />
          <button onClick={() => handleCheck(trackingNumber)}>核对</button>
        </div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.completed || false}
                onChange={() => toggleComplete(index)}
              />
              {todo['寄修单号']} - {todo['跟踪号']}
              <button onClick={() => deleteTodo(index)}>删除</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
