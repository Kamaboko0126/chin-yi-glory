import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "zh", // 預設語言
  fallbackLocale: "en", // 後備語言
  messages: {}, // 初始為空，動態載入語言檔案
});

export default i18n;