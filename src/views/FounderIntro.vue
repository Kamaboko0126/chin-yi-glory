<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import CardGroup1 from "../components/FounderIntro/CardGroup1.vue";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

const { locale, t } = useI18n();

// 優化的語言載入函數
async function loadLocaleMessages(targetLocale: string) {
  try {
    const messages = await import(`../locales/${targetLocale}/founderIntro.json`);
    i18n.global.setLocaleMessage(targetLocale, {
      ...i18n.global.getLocaleMessage(targetLocale),
      ...messages.default,
    });
    console.log(`Successfully loaded ${targetLocale} messages`);
  } catch (error) {
    console.error(`Failed to load ${targetLocale} messages:`, error);
  }
}

const currentLanguage = computed(() => locale.value);
const isLoading = ref(true);

// 語言切換功能
const switchLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem("preferred-language", lang);
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
  <div class="founder-intro" :class="{ loading: isLoading }">
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
          {{ t("title1") }}
        </h1>
        <p class="hero-subtitle">
          {{ currentLanguage === "zh" ? "副標題" : "Subtitle" }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <section class="content-section">
        <div class="content-wrapper">
          
          <div class="text-content">
            <div class="text-block">
              <p>{{ t("section1") }}</p>
            </div>
          </div>

          <div class="text-content">
            <div class="text-block">
              <h2 class="section-title">{{ t("title2") }}</h2>
              <p>{{ t("section1") }}</p>
              <p>{{ t("section2") }}</p>
              <p>{{ t("section3") }}</p>
              <p>{{ t("section4") }}</p>
              <p>{{ t("section5") }}</p>
              <p>{{ t("section6") }}</p>
              <p>{{ t("section7") }}</p>
              <p>{{ t("section8") }}</p>
              <p>{{ t("section9") }}</p>
              <p>{{ t("section10") }}</p>
              <p>{{ t("section11") }}</p>
            </div>
          </div>

          <div class="text-content">
            <div class="text-block">
              <h2 class="section-title">{{ t("title3") }}</h2>
              <p>{{ t("section12") }}</p>
              <p>{{ t("section13") }}</p>
              <p>{{ t("section14") }}</p>
              <p>{{ t("section15") }}</p>
              <p>{{ t("section16") }}</p>
              <p>{{ t("section17") }}</p>
              <p>{{ t("section18") }}</p>
              <p>{{ t("section19") }}</p>
              <p>{{ t("section20") }}</p>
              <p>{{ t("section21") }}</p>
              <p>{{ t("section22") }}</p>
              <p>{{ t("section23") }}</p>
            </div>
          </div>

          <!-- 卡片組件 -->
          <div class="card-section">
            <CardGroup1 />
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
.founder-intro {
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
