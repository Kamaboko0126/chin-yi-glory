<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import i18n from "../i18n";

const { locale, t } = useI18n();
const route = useRoute();

const logo = "/ncut_blue.png";
const isSidebarOpen = ref(false);
const isMobile = ref(false);

// 語言切換
const currentLanguage = computed(() => locale.value);
const switchLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh';
  locale.value = newLocale;
  localStorage.setItem('preferred-language', newLocale);
  loadLocaleMessages(newLocale).then(() => {
    updateMenuItems();
  });
};

// 檢查是否為移動端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

// 切換側邊欄
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// 關閉側邊欄
const closeSidebar = () => {
  isSidebarOpen.value = false;
};

async function loadLocaleMessages(locale: string) {
  try {
    const response = await fetch(`/locales/${locale}/menu.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const messages = await response.json();
    
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages,
    });
    console.log(`Locale messages for ${locale} loaded successfully.`);
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
  }
}

interface MenuItem {
  label: string;
  url?: string;
}

const menuItems = ref<MenuItem[]>([]);

function updateMenuItems() {
  menuItems.value = [
    {
      label: t("item1"),
      url: "/",
    },
    {
      label: t("item2"),
      url: "/curationintro",
    },
    {
      label: t("item4"),
      url: "/schoolintro",
    },
    {
      label: t("item5"),
      url: "/founderintro",
    },
    {
      label: t("item6"),
      url: "/",
    },
    {
      label: t("item7"),
      url: "/",
    }
  ];
}

// 檢查當前路由是否活躍
const isActiveRoute = (url: string | undefined) => {
  if (!url || url === '/') return route.path === '/';
  return route.path.startsWith(url);
};

onMounted(() => {
  // 從本地存儲載入語言偏好
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage && ['zh', 'en'].includes(savedLanguage)) {
    locale.value = savedLanguage;
  }
  
  loadLocaleMessages(locale.value).then(() => {
    updateMenuItems();
  });
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

// 監聽路由變化，在移動端自動關閉側邊欄
watch(() => route.path, () => {
  if (isMobile.value) {
    closeSidebar();
  }
});
</script>

<template>
  <!-- 側邊欄導航 -->
  <aside class="sidebar" :class="{ open: isSidebarOpen }">
    <div class="sidebar-header">
      <div class="brand-info">
        <img :src="logo" alt="logo" class="sidebar-logo" />
        <h3 class="site-title">
          {{ currentLanguage === 'zh' ? '勤益校園' : 'Chin-Yi' }}
        </h3>
        <p class="site-subtitle">
          {{ currentLanguage === 'zh' ? '藝術典藏' : 'Art Collection' }}
        </p>
      </div>
      <button class="close-btn" @click="closeSidebar" v-if="isMobile">
        ×
      </button>
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li 
          v-for="(item, index) in menuItems" 
          :key="item.url || `item-${index}`"
          class="nav-item"
        >
          <router-link 
            :to="item.url || '/'" 
            class="nav-link"
            :class="{ active: isActiveRoute(item.url || '/') }"
            @click="isMobile && closeSidebar()"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- 語言切換區塊 -->
    <div class="language-section">
      <h4 class="language-title">
        {{ currentLanguage === 'zh' ? '語言' : 'Language' }}
      </h4>
      <div class="language-switcher">
        <button 
          @click="switchLanguage" 
          class="lang-btn"
          :class="{ active: currentLanguage === 'zh' }"
        >
          中文
        </button>
        <button 
          @click="switchLanguage" 
          class="lang-btn"
          :class="{ active: currentLanguage === 'en' }"
        >
          English
        </button>
      </div>
    </div>

    <!-- 底部資訊 -->
    <div class="sidebar-footer">
      <p class="copyright">
        {{ currentLanguage === 'zh' ? '© 2024 勤益校園藝術典藏' : '© 2024 Chin-Yi Art Collection' }}
      </p>
    </div>
  </aside>

  <!-- 移動端選單按鈕 -->
  <button 
    class="mobile-menu-btn" 
    @click="toggleSidebar"
    :class="{ active: isSidebarOpen }"
    v-if="isMobile"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <!-- 遮罩層 (移動端) -->
  <div 
    class="sidebar-overlay" 
    v-if="isSidebarOpen && isMobile"
    @click="closeSidebar"
  ></div>
</template>

<style scoped lang="scss">
// 簡約風格變數
$primary-color: #2c3e50;
$secondary-color: #7f8c8d;
$white: #ffffff;
$border-color: #ecf0f1;
$sidebar-width: 260px;
$sidebar-width-mobile: 250px;
$header-height: 60px;

// 動畫
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// 頂部工具欄
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: $white;
  border-bottom: 1px solid $border-color;
  z-index: 1000;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    max-width: 100%;

    @media (min-width: 769px) {
      padding-left: calc(#{$sidebar-width} + 20px);
    }
  }

  .brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $primary-color;
    font-weight: 300;
    transition: color 0.3s ease;

    &:hover {
      color: darken($primary-color, 10%);
    }

    .logo {
      width: 35px;
      height: 35px;
      margin-right: 12px;
      
      @media (max-width: 768px) {
        width: 30px;
        height: 30px;
        margin-right: 8px;
      }
    }

    .brand-text {
      font-size: 1.1rem;
      
      @media (max-width: 768px) {
        font-size: 1rem;
      }
      
      @media (max-width: 480px) {
        display: none;
      }
    }
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  // 語言切換器
  .language-switcher {
    display: flex;
    align-items: center;
    gap: 8px;
    background: $border-color;
    padding: 5px 10px;
    border-radius: 15px;

    .lang-btn {
      background: none;
      border: none;
      padding: 3px 8px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 400;
      color: $secondary-color;
      transition: all 0.3s ease;

      &:hover {
        background: $white;
        color: $primary-color;
      }

      &.active {
        background: $primary-color;
        color: $white;
      }
    }

    .divider {
      color: $secondary-color;
      font-weight: 300;
    }
  }

  // 移動端選單按鈕
  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    @media (max-width: 768px) {
      display: flex;
    }

    span {
      display: block;
      height: 2px;
      width: 100%;
      background: $primary-color;
      border-radius: 1px;
      transition: all 0.3s ease;
    }

    &.active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }
  }
}

// 側邊欄
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: $sidebar-width;
  height: 100vh;
  background: $white;
  border-right: 1px solid $border-color;
  z-index: 999;
  overflow-y: auto;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: $sidebar-width-mobile;
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
      animation: slideInLeft 0.3s ease-out;
    }
  }

  .sidebar-header {
    padding: 30px 20px 20px;
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .brand-info {
      text-align: center;
      width: 100%;

      .sidebar-logo {
        width: 50px;
        height: 50px;
        margin-bottom: 15px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      .site-title {
        font-size: 1.3rem;
        font-weight: 300;
        color: $primary-color;
        margin: 0 0 5px 0;
        letter-spacing: 1px;
      }

      .site-subtitle {
        font-size: 0.9rem;
        color: $secondary-color;
        margin: 0;
        font-weight: 300;
        letter-spacing: 0.5px;
      }
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: $secondary-color;
      padding: 5px;
      position: absolute;
      top: 15px;
      right: 15px;

      &:hover {
        color: $primary-color;
      }
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 20px 0;

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin: 0;

      &:not(:last-child) {
        border-bottom: 1px solid $border-color;
      }
    }

    .nav-link {
      display: block;
      padding: 18px 25px;
      text-decoration: none;
      color: $secondary-color;
      font-size: 0.95rem;
      font-weight: 300;
      letter-spacing: 0.3px;
      transition: all 0.2s ease;
      position: relative;

      &:hover {
        color: $primary-color;
        background: rgba(0, 0, 0, 0.02);
      }

      &.active {
        color: $primary-color;
        background: rgba(44, 62, 80, 0.05);
        font-weight: 400;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: $primary-color;
        }
      }
    }
  }

  .sidebar-footer {
    padding: 20px;
    border-top: 1px solid $border-color;
    margin-top: auto;

    .copyright {
      font-size: 0.8rem;
      color: $secondary-color;
      text-align: center;
      margin: 0;
      font-weight: 300;
      line-height: 1.4;
    }
  }
}

// 遮罩層
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  animation: fadeIn 0.3s ease-out;
}

// 內容區塊佔位
.content-spacer {
  height: $header-height;
  
  @media (min-width: 769px) {
    margin-left: $sidebar-width;
  }
}

// 響應式設計
@media (max-width: 1024px) {
  .sidebar {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .top-header .header-content {
    padding-left: 20px;
  }
  
  .content-spacer {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .top-header {
    .header-content {
      padding: 0 15px;
    }
    
    .language-switcher {
      padding: 4px 8px;
      
      .lang-btn {
        padding: 2px 6px;
        font-size: 12px;
      }
    }
  }

  .sidebar {
    width: 90%;
    max-width: $sidebar-width-mobile;
  }
}

// 滾動條樣式
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: $light-gray;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #95a5a6;
}
</style>
