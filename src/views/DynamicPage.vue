<script setup lang="ts">
import { onMounted, ref, watch, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";
import { pageConfigs, type PageConfig, type ComponentConfig } from "../config/pageConfig";

const route = useRoute();
const { locale, t } = useI18n();

// 響應式狀態
const currentPageConfig = ref<PageConfig | null>(null);
const isLoading = ref(true);
const loadedComponents = ref<Record<string, any>>({});

// 計算屬性
const currentLanguage = computed(() => locale.value);
const pageId = computed(() => route.params.pageId as string);

// 語言切換功能
const switchLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem("preferred-language", lang);
};

// 優化的語言載入函數
async function loadLocaleMessages(targetLocale: string, localeFile: string) {
  try {
    const messages = await import(/* @vite-ignore */ `../locales/${targetLocale}/${localeFile}.json`);
    i18n.global.setLocaleMessage(targetLocale, {
      ...i18n.global.getLocaleMessage(targetLocale),
      ...messages.default,
    });
    console.log(`Successfully loaded ${targetLocale} messages for ${localeFile}`);
  } catch (error) {
    console.error(`Failed to load ${targetLocale} messages for ${localeFile}:`, error);
  }
}

// 動態載入組件
async function loadComponents(components: ComponentConfig[]) {
  const loadedComps: Record<string, any> = {};
  
  // 靜態組件映射，避免 Vite 分析問題
  const componentMap: Record<string, () => Promise<any>> = {
    'CardGroup1': () => import('../components/CurationIntro/CardGroup1.vue'),
    'CardGroup2': () => import('../components/CurationIntro/CardGroup2.vue'),
    'FounderCardGroup1': () => import('../components/FounderIntro/CardGroup1.vue'),
    'SchoolCardGroup1': () => import('../components/SchoolIntro/CardGroup1.vue'),
  };
  
  for (const comp of components) {
    try {
      const componentKey = comp.name;
      const importFn = componentMap[componentKey];
      
      if (importFn) {
        loadedComps[comp.name] = defineAsyncComponent(importFn);
      } else {
        // 回退到動態 import（帶有忽略註解）
        loadedComps[comp.name] = defineAsyncComponent(() => import(/* @vite-ignore */ comp.path));
      }
    } catch (error) {
      console.error(`Failed to load component ${comp.name}:`, error);
    }
  }
  
  loadedComponents.value = loadedComps;
}

// 初始化頁面
async function initializePage(pageId: string) {
  const config = pageConfigs[pageId];
  
  if (!config) {
    console.error(`Page config not found for: ${pageId}`);
    return;
  }

  currentPageConfig.value = config;
  
  // 載入語言文件
  await loadLocaleMessages(locale.value, config.localeFile);
  
  // 載入組件
  if (config.components) {
    await loadComponents(config.components);
  }
}

// 渲染文字區塊
const renderTextBlock = (content: string | string[]) => {
  if (Array.isArray(content)) {
    return content.map(key => t(key));
  }
  return [t(content)];
};

onMounted(async () => {
  // 從本地存儲載入語言偏好
  const savedLanguage = localStorage.getItem("preferred-language");
  if (savedLanguage && ["zh", "en"].includes(savedLanguage)) {
    locale.value = savedLanguage;
  }

  await initializePage(pageId.value);

  // 載入完成動畫
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

// 監聽頁面變化
watch(() => pageId.value, async (newPageId) => {
  if (newPageId) {
    isLoading.value = true;
    await initializePage(newPageId);
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  }
});

// 監聽語言變化
watch(locale, async (newLocale) => {
  if (currentPageConfig.value) {
    console.log(`Language switched to: ${newLocale}`);
    isLoading.value = true;
    await loadLocaleMessages(newLocale, currentPageConfig.value.localeFile);
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  }
});
</script>

<template>
  <div class="dynamic-page" :class="{ loading: isLoading }" v-if="currentPageConfig">
    <!-- 語言切換按鈕 (右上角) -->
    <div class="language-switcher">
      <button
        @click="switchLanguage('zh')"
        :class="{ active: currentLanguage === 'zh' }"
        class="lang-btn"
      >
        中文
      </button>
      <button
        @click="switchLanguage('en')"
        :class="{ active: currentLanguage === 'en' }"
        class="lang-btn"
      >
        EN
      </button>
    </div>

    <!-- Loading Overlay -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>{{ currentLanguage === "zh" ? "載入中..." : "Loading..." }}</p>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          {{ currentLanguage === 'zh' ? currentPageConfig.titleKey : currentPageConfig.titleKey }}
        </h1>
        <p class="hero-subtitle" v-if="currentPageConfig.subtitleKey">
          {{ currentLanguage === "zh" ? currentPageConfig.subtitleKey : currentPageConfig.subtitleKey }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <section class="content-section">
        <div class="content-wrapper">
          
          <!-- 動態渲染內容區塊 -->
          <template v-for="(section, index) in currentPageConfig.layout" :key="index">
            
            <!-- 文字區塊 -->
            <div v-if="section.type === 'text'" class="text-content">
              <div class="text-block" :class="section.className">
                <p v-for="(text, textIndex) in renderTextBlock(section.content || '')" :key="`text-${index}-${textIndex}`">
                  {{ text }}
                </p>
              </div>
            </div>

            <!-- 標題區塊 -->
            <div v-else-if="section.type === 'title'" class="text-content">
              <div class="text-block" :class="section.className">
                <h2 class="section-title">{{ t(section.title || '') }}</h2>
              </div>
            </div>

            <!-- 圖片區塊 -->
            <div v-else-if="section.type === 'image'" class="image-content">
              <img :src="section.image" :alt="section.title ? t(section.title) : ''" :class="section.className" />
              <p v-if="section.title" class="image-title">{{ t(section.title) }}</p>
            </div>

            <!-- 卡片組件區塊 -->
            <div v-else-if="section.type === 'cards'" class="card-section">
              <component 
                :is="loadedComponents[section.component || '']" 
                v-if="section.component && loadedComponents[section.component]"
                :class="section.className"
              />
            </div>

          </template>

        </div>
      </section>
    </div>
  </div>

  <!-- 頁面未找到 -->
  <div v-else class="page-not-found">
    <h1>Page Not Found</h1>
    <p>The requested page configuration could not be found.</p>
  </div>
</template>

<style scoped lang="scss">
// 簡約風格變數
$white: #ffffff;
$text-dark: #333333;
$text-light: #666666;
$text-lighter: #999999;
$border-light: #f0f0f0;
$border-gray: #e0e0e0;
$accent-red: #dc3545;
$bg-light: #fafafa;

// 簡約動畫
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 主容器 - 極簡風格
.dynamic-page {
  background: $white;
  min-height: 100vh;
  position: relative;

  &.loading {
    overflow: hidden;
  }
}

// 語言切換按鈕 (右上角)
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.98);
  padding: 8px;
  border-radius: 25px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid $border-light;

  .lang-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 18px;
    background: transparent;
    color: $text-light;
    font-size: 0.9rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;

    &:hover {
      background: rgba(51, 51, 51, 0.05);
      color: $text-dark;
    }

    &.active {
      background: $text-dark;
      color: $white;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;

    .lang-btn {
      padding: 6px 12px;
      font-size: 0.85rem;
    }
  }
}

// Loading 覆蓋層
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .loading-spinner {
    text-align: center;

    .spinner {
      width: 30px;
      height: 30px;
      border: 2px solid $border-light;
      border-top: 2px solid $text-dark;
      border-radius: 50%;
      margin: 0 auto 15px;
      animation: spinner 1s linear infinite;
    }

    p {
      color: $text-light;
      font-size: 14px;
      font-weight: 400;
    }
  }
}

// Hero 區塊 - 簡約設計
.hero-section {
  padding: 80px 20px 60px;
  text-align: center;
  background: $white;
  border-bottom: 1px solid $border-light;

  .hero-content {
    max-width: 700px;
    margin: 0 auto;

    .hero-title {
      font-size: 3rem;
      font-weight: 400;
      color: $text-dark;
      margin-bottom: 20px;
      letter-spacing: -1px;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 2.2rem;
        margin-bottom: 15px;
      }

      @media (max-width: 480px) {
        font-size: 1.8rem;
      }
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: $text-lighter;
      font-weight: 300;
      line-height: 1.6;
      margin-bottom: 0;

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }
}

// 主容器
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

// 內容區塊 - 簡約文字設計
.content-section {
  padding: 60px 0 80px;
  background: $white;

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 1.8rem;
    font-weight: 400;
    color: $text-dark;
    margin-bottom: 30px;
    letter-spacing: -0.3px;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 25px;
    }
  }

  .text-content {
    margin: 40px 0;

    .text-block {
      background: $white;
      padding: 40px 0;
      margin-bottom: 30px;
      line-height: 1.8;
      border-bottom: 1px solid $border-light;

      @media (max-width: 768px) {
        padding: 30px 0;
      }

      p {
        color: $text-dark;
        font-size: 1.1rem;
        margin-bottom: 20px;
        text-align: left;
        font-weight: 300;
        line-height: 1.8;

        &:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          font-size: 1rem;
          margin-bottom: 18px;
        }

        a {
          color: $accent-red;
          text-decoration: none;
          font-weight: 400;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .card-section {
    margin: 60px 0;
    background: $white;
    padding: 0;

    @media (max-width: 768px) {
      margin: 40px 0;
    }
  }

  .image-content {
    margin: 40px 0;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .image-title {
      margin-top: 16px;
      font-size: 18px;
      font-weight: 500;
      color: #333;
      letter-spacing: 1px;
    }
  }
}

// 頁面未找到
.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  
  h1 {
    font-size: 2rem;
    color: $text-dark;
    margin-bottom: 1rem;
  }
  
  p {
    color: $text-light;
    font-size: 1.1rem;
  }
}

// 響應式設計
@media (max-width: 1024px) {
  .container {
    padding: 0 15px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 15px 30px;
  }

  .content-section {
    padding: 40px 0 60px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 15px 25px;
  }

  .content-section {
    padding: 30px 0 50px;
  }
}
</style>
