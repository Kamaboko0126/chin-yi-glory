<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import CardGroup1 from "../components/CurationIntro/CardGroup1.vue";
import CardGroup2 from "../components/CurationIntro/CardGroup2.vue";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

const { locale, t } = useI18n();

// 優化的語言載入函數
async function loadLocaleMessages(targetLocale: string) {
  try {
    const messages = await import(
      `../locales/${targetLocale}/curationIntro.json`
    );
    i18n.global.setLocaleMessage(targetLocale, {
      ...i18n.global.getLocaleMessage(targetLocale),
      ...messages.default,
    });
    console.log(`Successfully loaded ${targetLocale} messages`);
  } catch (error) {
    console.error(`Failed to load ${targetLocale} messages:`, error);
  }
}

// 圖片資源 - 使用字符串路徑
const artworkImages = ref([
  { src: "/src/assets/curation/01.jpg", loaded: false },
  { src: "/src/assets/curation/02.jpg", loaded: false },
  { src: "/src/assets/curation/03.jpg", loaded: false },
  { src: "/src/assets/curation/04.jpg", loaded: false },
  { src: "/src/assets/curation/05.jpg", loaded: false },
  { src: "/src/assets/curation/06.jpg", loaded: false },
]);

const currentLanguage = computed(() => locale.value);
const isLoading = ref(true);

// 語言切換功能
const switchLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem("preferred-language", lang);
};

// 圖片載入處理
const handleImageLoad = (index: number) => {
  artworkImages.value[index].loaded = true;
};

onMounted(async () => {
  // 從本地存儲載入語言偏好
  const savedLanguage = localStorage.getItem("preferred-language");
  if (savedLanguage && ["zh", "en"].includes(savedLanguage)) {
    locale.value = savedLanguage;
  }

  await loadLocaleMessages(locale.value);

  // 載入完成動畫
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

// 監聽語言變化
watch(locale, async (newLocale) => {
  console.log(`Language switched to: ${newLocale}`);
  isLoading.value = true;
  await loadLocaleMessages(newLocale);
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});
</script>

<template>
  <div class="curation-intro" :class="{ loading: isLoading }">
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
          {{ currentLanguage === "zh" ? "關於此展覽" : "About this Curation" }}
        </h1>
        <p class="hero-subtitle">
          {{ currentLanguage === "zh" ? "副標題" : "Subtitle" }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <!-- 簡約文字內容 -->
      <section class="content-section">
        <div class="content-wrapper">
          <!-- <h2 class="section-title">
            {{ currentLanguage === 'zh' ? '關於此展覽' : 'About This Exhibition' }}
          </h2> -->

          <div class="text-content">
            <div class="text-block">
              <p>{{ t("section1") }}</p>
              <p>{{ t("section2") }}</p>
            </div>
          </div>

          <!-- 第一組卡片 -->
          <div class="card-section">
            <CardGroup1 />
          </div>

          <div class="text-content">
            <div class="text-block">
              <p>{{ t("section3") }}</p>
              <p>{{ t("section4") }}</p>
              <p>{{ t("section5") }}</p>
              <p>{{ t("section6") }}</p>
            </div>
          </div>

          <!-- 第二組卡片 -->
          <div class="card-section">
            <CardGroup2 />
          </div>

          <div class="text-content">
            <div class="text-block">
              <p>{{ t("section7") }}</p>
              <p>{{ t("section8") }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
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
.curation-intro {
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
  background: rgba(255, 255, 255, 0.98); // 稍微調整透明度
  padding: 8px;
  border-radius: 25px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08); // 調整陰影更淡
  backdrop-filter: blur(10px);
  border: 1px solid $border-light; // 添加邊線增加對比

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
  padding: 80px 20px 60px; // 增加上下padding
  text-align: center;
  background: $white;
  border-bottom: 1px solid $border-light;

  .hero-content {
    max-width: 700px; // 稍微增加寬度
    margin: 0 auto;

    .hero-title {
      font-size: 3rem; // 增大標題字體
      font-weight: 400; // 調整字重
      color: $text-dark;
      margin-bottom: 20px;
      letter-spacing: -1px; // 調整字間距
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
      font-size: 1.2rem; // 稍微增大副標題
      color: $text-lighter; // 使用更淺的顏色
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
  max-width: 900px; // 稍微減少最大寬度，讓內容更集中
  margin: 0 auto;
  padding: 0 20px;
}

// 作品網格區塊 - 模仿圖片中的網格設計
.artwork-grid-section {
  padding: 60px 0;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 40px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 25px;
    }
  }

  .artwork-item {
    animation: fadeInUp 0.6s ease-out both;
  }

  .artwork-card {
    background: $white;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);

      .image-container img {
        transform: scale(1.02);
      }
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 280px;
      overflow: hidden;
      background: $bg-light;

      @media (max-width: 480px) {
        height: 220px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease;
        opacity: 0;

        &.loaded {
          opacity: 1;
        }
      }
    }

    .artwork-info {
      padding: 20px 0;

      .artwork-title {
        font-size: 1rem;
        font-weight: 400;
        color: $text-dark;
        margin-bottom: 5px;
        line-height: 1.4;
      }

      .artwork-subtitle {
        font-size: 0.9rem;
        color: $text-light;
        margin-bottom: 10px;
        font-weight: 300;
      }

      .collection-tag {
        display: inline-block;
        font-size: 0.8rem;
        color: $accent-red;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
  }
}

// 內容區塊 - 簡約文字設計
.content-section {
  padding: 60px 0 80px;
  background: $white; // 改為純白色背景

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 1.8rem;
    font-weight: 300;
    color: $text-dark;
    text-align: center;
    margin-bottom: 40px;
    letter-spacing: -0.3px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 30px;
    }
  }

  .text-content {
    margin: 40px 0;

    .text-block {
      background: $white;
      padding: 40px 0; // 調整為上下padding，左右不用
      margin-bottom: 30px;
      line-height: 1.8; // 增加行高
      border-bottom: 1px solid $border-light; // 添加底部邊線

      @media (max-width: 768px) {
        padding: 30px 0;
      }

      p {
        color: $text-dark;
        font-size: 1.1rem; // 稍微增大字體
        margin-bottom: 20px; // 增加段落間距
        text-align: left; // 改為左對齊
        font-weight: 300; // 調整字重
        line-height: 1.8;

        &:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          font-size: 1rem;
          margin-bottom: 18px;
        }
      }
    }
  }

  .card-section {
    margin: 60px 0; // 增加上下間距
    background: $white;
    padding: 0; // 移除padding讓卡片組件自己控制

    @media (max-width: 768px) {
      margin: 40px 0;
    }
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

  .artwork-grid-section {
    padding: 40px 0;
  }

  .content-section {
    padding: 40px 0 60px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 15px 25px;
  }

  .artwork-grid-section {
    padding: 30px 0;
  }

  .content-section {
    padding: 30px 0 50px;
  }
}
</style>
