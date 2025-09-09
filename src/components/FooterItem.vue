<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

// 接收 props
const props = defineProps<{
  isHomePage: boolean;
}>();

const { locale, t } = useI18n();

async function loadLocaleMessages(locale: string) {
  try {
    const response = await fetch(`/locales/${locale}/footer.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const messages = await response.json();
    
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages,
    });
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
  }
}

onMounted(() => {
  loadLocaleMessages(locale.value);
});

// 監聽 locale 的變化，當語言切換時重新載入資料
watch(locale, (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
  loadLocaleMessages(newLocale);
});
</script>

<template>
  <footer :class="{ 'homepage-footer': props.isHomePage }">
    <div class="content">
      <p>
        {{ t("footer1") }}
      </p>
      <p>
        {{ t("footer2") }}
        <a href="https://chinyihalloffame.blogspot.com/p/blog-page_7.html"
          >https://chinyihalloffame.blogspot.com/p/blog-page_7.html</a
        >
        {{ t("footer3") }}
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
// 與側邊欄一致的寬度變數
$sidebar-width: 260px;
$sidebar-width-mobile: 250px;

footer {
  background: #d2d2d213;
  padding: 0rem 3rem;
  width: 100%;
  
  // 在非首頁且非移動端時為側邊欄預留空間
  @media (min-width: 769px) {
    margin-left: $sidebar-width;
    width: calc(100% - #{$sidebar-width});
  }
  
  // 首頁樣式 - 不為側邊欄預留空間
  &.homepage-footer {
    @media (min-width: 769px) {
      margin-left: 0;
      width: 100%;
    }
  }
  
  @media (max-width: 1400px) {
    padding: 0rem 3rem;
  }
  @media (max-width: 1199px) {
    padding: 0rem 3rem;
  }
  @media (max-width: 768px) {
    // 移動端不需要為側邊欄預留空間
    margin-left: 0;
    width: 100%;
    padding: 0rem 3rem;
  }
  @media (max-width: 575px) {
    padding: 0rem 3rem;
  }
  
  .content {
    padding: 1.5rem 0rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1728px;
    border-top: 1px solid #e2e8f0;
    margin: 0 auto;
  }
  
  p {
    font-size: 12px;
    color: #334155;
    font-weight: 500;
    &:nth-child(2) {
      margin-top: 5px;
    }
  }
  
  a {
    color: #334155;
    font-weight: 500;
    text-decoration: none;
    word-break: break-word; /* 允許長單字（如 URL）換行 */
    overflow-wrap: break-word; /* 兼容性處理 */
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
