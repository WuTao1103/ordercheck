import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 中文翻译
const zhTranslations = {
  title: '订单核对系统',
  uploadFile: '上传文件',
  totalItems: '总事项数',
  completedItems: '已完成数',
  incompleteItems: '未完成数',
  completionPercentage: '完成百分比',
  all: '全部',
  completed: '已完成',
  incomplete: '未完成',
  exportExcel: '导出Excel',
  workOrderPlaceholder: '输入工单号',
  trackingNumberPlaceholder: '输入运输单号',
  check: '核对',
  delete: '删除',
  viewRecords: '查看记录',
  backToMain: '返回主功能',
  queryRecords: '查询记录',
  search: '查询',
  workOrder: '工单号',
  trackingNumber: '跟踪号',
  checkResult: '核对结果',
  checkTime: '核对时间',
  success: '成功',
  failure: '失败',
  totalChecks: '总核对次数',
  successCount: '成功次数',
  failureCount: '失败次数',
  successRate: '成功率',
  noDataToExport: '没有可导出的数据！',
  checkRecords: '核对记录',
  pendingCheckList: '待核对清单',
  workOrderLabel: '工单号',
  trackingNumberLabel: '跟踪号',
  completionStatus: '完成状态',
  completed: '已完成',
  notCompleted: '未完成',
  language: '语言',
  chinese: '中文',
  english: 'English',
  // 添加文件上传相关翻译
  selectFile: '选择文件',
  repairOrderNumber: '寄修单号',
  trackingNumberField: '跟踪号'
};

// 英文翻译
const enTranslations = {
  title: 'Order Check System',
  uploadFile: 'Upload File',
  totalItems: 'Total Items',
  completedItems: 'Completed Items',
  incompleteItems: 'Incomplete Items',
  completionPercentage: 'Completion Percentage',
  all: 'All',
  completed: 'Completed',
  incomplete: 'Incomplete',
  exportExcel: 'Export Excel',
  workOrderPlaceholder: 'Enter work order',
  trackingNumberPlaceholder: 'Enter tracking number',
  check: 'Check',
  delete: 'Delete',
  viewRecords: 'View Records',
  backToMain: 'Back to Main',
  queryRecords: 'Query Records',
  search: 'Search',
  workOrder: 'Work Order',
  trackingNumber: 'Tracking Number',
  checkResult: 'Check Result',
  checkTime: 'Check Time',
  success: 'Success',
  failure: 'Failure',
  totalChecks: 'Total Checks',
  successCount: 'Success Count',
  failureCount: 'Failure Count',
  successRate: 'Success Rate',
  noDataToExport: 'No data to export!',
  checkRecords: 'Check Records',
  pendingCheckList: 'Pending Check List',
  workOrderLabel: 'Work Order',
  trackingNumberLabel: 'Tracking Number',
  completionStatus: 'Completion Status',
  completed: 'Completed',
  notCompleted: 'Not Completed',
  language: 'Language',
  chinese: '中文',
  english: 'English',
  // 添加文件上传相关翻译
  selectFile: 'Select File',
  repairOrderNumber: 'Repair Order Number',
  trackingNumberField: 'Tracking Number'
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        translation: zhTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: 'en', // 默认语言改为英文
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 