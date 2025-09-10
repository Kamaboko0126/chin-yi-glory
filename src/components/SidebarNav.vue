<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import i18n from "../i18n";

const { locale, t } = useI18n();
const route = useRoute();

// 接收 props
const props = defineProps<{
  isHomePage: boolean;
}>();

const logo = "/ncut_blue.png";
const isSidebarOpen = ref(false);
const isMobile = ref(false);

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

// 判斷是否顯示 menu button - 在首頁或移動端顯示
const shouldShowMenuButton = computed(() => {
  return props.isHomePage || isMobile.value;
});

// 判斷是否套用首頁隱藏樣式
const shouldApplyHomepageHidden = computed(() => {
  return props.isHomePage && !isSidebarOpen.value;
});

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
      url: "/page/curation",
    },
    {
      label: t("item3"),
      url: "/page/school",
    },
    {
      label: t("item4"),
      url: "/page/founder",
    },
    {
      label: t("item5"),
      url: "/page/foundation",
    },
    {
      label: t("item6"),
      url: "/page/artworks",
    }
  ];
}

// 檢查當前路由是否活躍
const isActiveRoute = (url: string) => {
  if (url === '/') return route.path === '/';
  return route.path.startsWith(url);
};

const currentLanguage = computed(() => locale.value);

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

// 監聽語言變化
watch(locale, (newLocale) => {
  loadLocaleMessages(newLocale).then(() => {
    updateMenuItems();
  });
});

// 監聽路由變化
watch(() => route.path, () => {
  // 在移動端切換路由時關閉側邊欄
  if (isMobile.value && isSidebarOpen.value) {
    closeSidebar();
  }
});

// 監聽 isHomePage 變化
watch(() => props.isHomePage, (newVal) => {
  if (newVal && !isMobile.value) {
    // 切換到首頁時在桌面端關閉側邊欄
    closeSidebar();
  }
});
</script>

<template>
  <!-- Menu按鈕 - 在首頁或移動端顯示 -->
  <button 
    class="menu-toggle" 
    @click="toggleSidebar"
    :class="{ 
      active: isSidebarOpen,
      'homepage-hint': props.isHomePage && !isSidebarOpen
    }"
    v-if="shouldShowMenuButton"
    :title="currentLanguage === 'zh' ? '選單' : 'Menu'"
    :aria-label="currentLanguage === 'zh' ? '開啟選單' : 'Open Menu'"
  >
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>

  <!-- 側邊欄導航 - 在非首頁預設顯示，首頁需要點擊才顯示 -->
  <aside class="sidebar" :class="{ 
    open: isSidebarOpen, 
    'homepage-hidden': shouldApplyHomepageHidden 
  }">
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
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li 
          v-for="item in menuItems" 
          :key="item.url"
          class="nav-item"
        >
          <router-link 
            :to="item.url || '/'" 
            class="nav-link"
            :class="{ active: isActiveRoute(item.url || '/') }"
            @click="(shouldShowMenuButton && closeSidebar())"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- 底部資訊 -->
    <div class="sidebar-footer">
      <p class="copyright">
        {{ currentLanguage === 'zh' ? '© 2024 勤益校園藝術典藏' : '© 2024 Chin-Yi Art Collection' }}
      </p>
    </div>
  </aside>

  <!-- 遮罩層 -->
  <div 
    class="sidebar-overlay" 
    v-if="isSidebarOpen && shouldShowMenuButton"
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

// 選單按鈕
.menu-toggle {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: rgba(115, 72, 34, 0.9);
  border: 2px solid rgba(115, 72, 34, 0.1);
  border-radius: 12px;
  cursor: pointer;
  padding: 0;
  box-shadow: 
    0 8px 25px rgba(115, 72, 34, 0.3),
    0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  // 添加質感背景
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: inherit;
    pointer-events: none;
  }

  &:hover {
    background: rgba(115, 72, 34, 1);
    border-color: rgba(115, 72, 34, 0.3);
    box-shadow: 
      0 12px 35px rgba(115, 72, 34, 0.4),
      0 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 
      0 6px 20px rgba(115, 72, 34, 0.3),
      0 3px 8px rgba(0, 0, 0, 0.1);
  }

  .hamburger-line {
    display: block;
    height: 3px;
    width: 22px;
    background: #ffffff;
    border-radius: 3px;
    margin: 3px 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    
    // 添加光澤效果
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: inherit;
    }
  }

  &.active {
    background: rgba(40, 49, 73, 0.95);
    border-color: rgba(40, 49, 73, 0.3);
    
    .hamburger-line {
      background: #ffffff;
      
      &:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }
      &:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
  }

  // 首頁提示動畫
  @keyframes elegantPulse {
    0% {
      box-shadow: 
        0 8px 25px rgba(115, 72, 34, 0.3),
        0 4px 10px rgba(0, 0, 0, 0.1),
        0 0 0 0 rgba(115, 72, 34, 0.5);
    }
    50% {
      box-shadow: 
        0 8px 25px rgba(115, 72, 34, 0.3),
        0 4px 10px rgba(0, 0, 0, 0.1),
        0 0 0 10px rgba(115, 72, 34, 0.1);
    }
    100% {
      box-shadow: 
        0 8px 25px rgba(115, 72, 34, 0.3),
        0 4px 10px rgba(0, 0, 0, 0.1),
        0 0 0 0 rgba(115, 72, 34, 0);
    }
  }

  @keyframes gentleFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  // 在首頁且未打開時顯示提示動畫
  &.homepage-hint {
    animation: 
      elegantPulse 3s ease-in-out infinite,
      gentleFloat 4s ease-in-out infinite;
  }

  // 響應式調整
  @media (max-width: 768px) {
    top: 25px;
    left: 25px;
    width: 46px;
    height: 46px;
    
    .hamburger-line {
      width: 20px;
      height: 2.5px;
      margin: 2.5px 0;
    }
  }

  @media (max-width: 575px) {
    top: 20px;
    left: 20px;
    width: 42px;
    height: 42px;
    
    .hamburger-line {
      width: 18px;
      height: 2px;
      margin: 2px 0;
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
  z-index: 1000;
  overflow-y: auto;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  
  // 預設顯示狀態
  transform: translateX(0);

  // 首頁隱藏狀態
  &.homepage-hidden {
    transform: translateX(-100%);
  }

  // 顯示狀態 (點擊後顯示) - 移除 !important 讓過渡效果正常工作
  &.open {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    width: $sidebar-width-mobile;
    // 移動端預設隱藏
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
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
  z-index: 999;
}

// 滾動條樣式
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: $border-color;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #95a5a6;
}
</style>
