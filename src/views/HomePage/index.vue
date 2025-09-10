<script setup lang="ts">
import { onMounted, watch, nextTick, ref, computed } from "vue";
import { gsap } from "gsap";
import { useI18n } from "vue-i18n";
import i18n from "../../i18n";

const { locale, t } = useI18n();

// 語言切換
const currentLanguage = computed(() => locale.value);
const switchLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh';
  locale.value = newLocale;
  localStorage.setItem('preferred-language', newLocale);
  loadLocaleMessages(newLocale);
};

async function loadLocaleMessages(locale: string) {
  try {
    const response = await fetch(`/locales/${locale}/home.json`);
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

const artwork = "/artworks/02.jpg";
const logo = "/ncut-brown.png";
const isInfoOpen = ref(false);
const isInitial = ref(true);
const showTooltip = ref(true);

const toggleInfo = () => {
  isInitial.value = false;
  showTooltip.value = false;
  if (isInfoOpen.value) {
    isInfoOpen.value = false;
  } else {
    isInfoOpen.value = true;
  }
};

onMounted(() => {
  // 從本地存儲載入語言偏好
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage && ['zh', 'en'].includes(savedLanguage)) {
    locale.value = savedLanguage;
  }
  
  loadLocaleMessages(locale.value);

  nextTick(() => {
    var tl = gsap.timeline();
    tl.from(".first .background", {
      duration: 3,
      opacity: 0,
      scale: 3,
      ease: "power2.out",
    });
    tl.from(".first .logo", {
      duration: 4,
      opacity: 0,
      ease: "power2.out",
      delay: -1,
    });
    tl.from(
      ".tooltip",
      {
        display: "none",
        width: 0,
        ease: "power2.out",
        duration: 1.5,
        delay: 1,
      },
      "<"
    );
  });
});

// 監聽 locale 的變化，當語言切換時重新載入資料
watch(locale, (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
  loadLocaleMessages(newLocale);
});
</script>

<template>
  <section class="first">
    <div class="content">
      <div class="background" :style="{ backgroundImage: `url(${artwork})` }">
        <!-- 語言切換按鈕 -->
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
            EN
          </button>
        </div>
        
        <div class="logo">
          <img :src="logo" />
          <div class="banner-title">
            <h2>{{ t("title1") }}</h2>
            <h2>{{ t("title2") }}</h2>
          </div>
        </div>
        <div class="info-icon">
          <div class="tooltip" v-if="showTooltip">
            <div class="arrow"></div>
            <p class="tooltip-text">{{ currentLanguage === 'zh' ? '點擊查看策展資訊' : 'Click to view more' }}</p>
          </div>
          <i class="material-icons" @click="toggleInfo">info</i>
        </div>
        <div
          class="text"
          :class="{ expand: isInfoOpen, close: !isInfoOpen }"
          v-if="!isInitial"
        >
          <p>{{ t("info1") }}</p>
          <p>{{ t("info2") }}</p>
          <p>{{ t("info3") }}</p>
          <p>{{ t("info4") }}</p>
          <p>{{ t("info5") }}</p>
          <p>{{ t("info6") }}</p>
          <p>{{ t("info7") }}</p>
          <p>{{ t("info8") }}</p>
          <p>{{ t("info9") }}</p>
          <p>{{ t("info10") }}</p>
          <p>{{ t("info11") }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.first {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .background {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
    }
  }
  .logo {
    position: absolute;
    left: 120px;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1400px) {
      left: 80px;
      top: 80px;
    }
    @media (max-width: 1199px) {
      left: 50px;
      top: 50px;
    }
    @media (max-width: 767px) {
      left: 40px;
      top: 40px;
    }
    @media (max-width: 575px) {
      left: 30px;
      top: 30px;
    }
    img {
      width: 85px;
      height: 85px;
      transform: translateY(7px);
      @media (max-width: 1400px) {
        width: 80px;
        height: 80px;
      }
      @media (max-width: 1199px) {
        width: 72px;
        height: 72px;
      }
      @media (max-width: 767px) {
        width: 65px;
        height: 65px;
      }
      @media (max-width: 575px) {
        width: 60px;
        height: 60px;
      }
    }
    .banner-title {
      margin-left: 14px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      h2 {
        color: #734822;
        font-size: 55px;
        font-weight: 800;
        transform: translateY(7px);
        letter-spacing: 5px;
        line-height: 110%;
        @media (max-width: 1400px) {
          font-size: 50px;
        }
        @media (max-width: 1199px) {
          font-size: 45px;
        }
        @media (max-width: 767px) {
          font-size: 40px;
        }
        @media (max-width: 575px) {
          font-size: 35px;
        }
        &:nth-child(2) {
          font-size: 29px;
          font-weight: bolder;
          letter-spacing: 0;
          @media (max-width: 1400px) {
            font-size: 26.5px;
          }
          @media (max-width: 1199px) {
            font-size: 24px;
          }
          @media (max-width: 767px) {
            font-size: 21.5px;
          }
          @media (max-width: 575px) {
            font-size: 19.2px;
          }
        }
      }
    }
  }
  
  // 語言切換按鈕
  .language-switcher {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 100;
    display: flex;
    gap: 8px;
    
    @media (max-width: 768px) {
      top: 25px;
      right: 25px;
    }
    
    @media (max-width: 575px) {
      top: 20px;
      right: 20px;
    }

    .lang-btn {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(115, 72, 34, 0.3);
      border-radius: 8px;
      color: #734822;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      
      @media (max-width: 768px) {
        padding: 6px 12px;
        font-size: 13px;
      }
      
      @media (max-width: 575px) {
        padding: 5px 10px;
        font-size: 12px;
      }

      &:hover {
        background: rgba(255, 255, 255, 1);
        border-color: rgba(115, 72, 34, 0.5);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(115, 72, 34, 0.2);
      }

      &.active {
        background: rgba(115, 72, 34, 0.9);
        color: white;
        border-color: rgba(115, 72, 34, 0.7);
        
        &:hover {
          background: rgba(115, 72, 34, 1);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(115, 72, 34, 0.3);
        }
      }
    }
  }
  
  .info-icon {
    position: absolute;
    right: 15px;
    top: 190px;
    z-index: 99;
    @media (max-width: 1400px) {
      right: 15px;
      top: 175px;
    }
    @media (max-width: 1199px) {
      right: 15px;
      top: 165px;
    }
    @media (max-width: 767px) {
      right: 13px;
      top: 157px;
    }
    @media (max-width: 575px) {
      right: 13px;
      top: 147px;
    }

    .tooltip {
      position: absolute;
      top: -60px;
      right: -15px;
      display: inline-block;
      animation: tooltipPulse 2s ease-in-out infinite;
      
      .arrow {
        height: 0;
        width: 0;
        border-width: 6px;
        border-style: solid;
        border-color: rgba(40, 49, 73, 0.95) transparent transparent transparent;
        position: absolute;
        top: 100%;
        right: 22px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }
      
      .tooltip-text {
        max-width: 200px;
        background: rgba(40, 49, 73, 0.95);
        white-space: nowrap;
        padding: 8px 12px;
        border-radius: 8px;
        color: #fff;
        box-shadow: 0 6px 20px rgba(40, 49, 73, 0.3);
        font-size: 14px;
        font-weight: 500;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        
        @media (max-width: 767px) {
          font-size: 12px;
          padding: 6px 10px;
          max-width: 160px;
        }
      }
    }

    i {
      color: #ffffff;
      font-size: 30px;
      cursor: pointer;
      background: rgba(40, 49, 73, 0.9);
      border-radius: 50%;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 54px;
      box-shadow: 0 4px 20px rgba(40, 49, 73, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.2);
      
      &:hover {
        background: rgba(40, 49, 73, 1);
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(40, 49, 73, 0.4);
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      &:active {
        transform: scale(0.95);
      }
      
      @media (max-width: 1400px) {
        font-size: 28px;
        width: 52px;
        height: 52px;
        padding: 12px;
      }
      @media (max-width: 1199px) {
        font-size: 26px;
        width: 50px;
        height: 50px;
        padding: 12px;
      }
      @media (max-width: 767px) {
        font-size: 24px;
        width: 48px;
        height: 48px;
        padding: 12px;
      }
      @media (max-width: 575px) {
        font-size: 22px;
        width: 46px;
        height: 46px;
        padding: 12px;
      }
    }
  }
  .text {
    position: absolute;
    padding: 30px 90px 30px 50px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    right: 0;
    top: 170px;
    background: #fffffff7;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    @media (max-width: 1400px) {
      top: 160px;
    }
    @media (max-width: 1199px) {
      top: 150px;
    }
    @media (max-width: 767px) {
      top: 140px;
    }
    @media (max-width: 575px) {
      top: 130px;
    }
    p {
      color: #283149;
      font-weight: 500;
      line-height: 150%;
    }
  }
}

.expand {
  animation: expand 1s cubic-bezier(0.42, 0.8, 0.58, 1) forwards;
}

.close {
  animation: close 1s cubic-bezier(0.42, 0.8, 0.58, 1) forwards;
}

@keyframes expand {
  0% {
    clip-path: circle(0% at calc(100% - 30px) calc(35px));
  }
  100% {
    clip-path: circle(150% at calc(100% - 10px) calc(100px));
  }
}

@keyframes close {
  0% {
    clip-path: circle(150% at calc(100% - 8px) calc(10px));
  }
  100% {
    clip-path: circle(0% at calc(100% - 30px) calc(35px));
  }
}

@keyframes tooltipPulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>
