import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Order Check": "Order Check",
          "Total Items": "Total Items",
          "Completed": "Completed",
          "Incomplete": "Incomplete",
          "Completion Percentage": "Completion Percentage",
          "All": "All",
          "Completed Only": "Completed Only",
          "Incomplete Only": "Incomplete Only",
          "Enter Work Order": "Enter Work Order",
          "Enter Tracking Number": "Enter Tracking Number",
          "Check": "Check"
        }
      },
      zh: {
        translation: {
          "Order Check": "订单检查",
          "Total Items": "总事项数",
          "Completed": "已完成数",
          "Incomplete": "未完成数",
          "Completion Percentage": "完成百分比",
          "All": "全部",
          "Completed Only": "仅已完成",
          "Incomplete Only": "仅未完成",
          "Enter Work Order": "输入工单号",
          "Enter Tracking Number": "输入运输单号",
          "Check": "核对"
        }
      }
    },
    lng: "zh", // 默认语言
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 