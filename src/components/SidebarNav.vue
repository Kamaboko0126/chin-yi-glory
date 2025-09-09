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

const logo = "/src/assets/ncut_blue.png";
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
    const messages = await import(`../locales/${locale}/menu.json`);
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages.default,
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
      label: t("item4"),
      url: "/page/school",
    },
    {
      label: t("item5"),
      url: "/page/founder",
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
    :class="{ active: isSidebarOpen }"
    v-if="shouldShowMenuButton"
  >
    <span></span>
    <span></span>
    <span></span>
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

// 移動端選單按鈕
.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

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
