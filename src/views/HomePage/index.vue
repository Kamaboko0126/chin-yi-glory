<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from "vue";
import { gsap } from "gsap";
import { useI18n } from "vue-i18n";
import i18n from "../../i18n";

const { locale, t } = useI18n();

async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`../../locales/${locale}/home.json`);
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages.default,
    });
    console.log(`Locale messages for ${locale} loaded successfully.`);
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
  }
}

const artwork = new URL("../../assets/artworks/02.jpg", import.meta.url).href;
const logo = new URL("../../assets/ncut_blue.png", import.meta.url).href;
const isInfoOpen = ref(true);

onMounted(() => {
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
      ".first .text",
      {
        display: "none",
        ease: "power2.out",
        delay: 2.5,
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
        <div class="logo">
          <img :src="logo" />
          <div class="title">
            <h2>{{ t("title1") }}</h2>
            <h2>{{ t("title2") }}</h2>
          </div>
        </div>
        <div class="info-icon">
          <i class="material-icons" @click="isInfoOpen = !isInfoOpen">info</i>
        </div>
        <div
          class="text"
          :class="{ expand: isInfoOpen, close: !isInfoOpen }"
        >
        <p>{{t('info1')}}</p>
        <p>{{t('info2')}}</p>
        <p>{{t('info3')}}</p>
        <p>{{t('info4')}}</p>
        <p>{{t('info5')}}</p>
        <p>{{t('info6')}}</p>
        <p>{{t('info7')}}</p>
        <p>{{t('info8')}}</p>
        <p>{{t('info9')}}</p>
        <p>{{t('info10')}}</p>
        <p>{{t('info11')}}</p>
        <p>{{t('info12')}}</p>
        <p>{{t('info13')}}</p>
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
    @media (max-width: 1100px) {
      position: relative;
      top: 0;
      left: 0;
      justify-content: flex-start;
      margin: 50px;
    }
    img {
      width: 85px;
      height: 85px;
    }
    .title {
      margin-left: 14px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      h2 {
        color: #283149;
        font-size: 55px;
        font-weight: 800;
        transform: translateY(7px);
        letter-spacing: 5px;
        line-height: 110%;
        &:nth-child(2) {
          font-size: 29px;
          font-weight: bolder;
          letter-spacing: 0;
        }
      }
    }
  }
  .info-icon {
    position: absolute;
    right: 15px;
    top: 190px;
    z-index: 99;
    i {
      font-size: 30px;
      cursor: pointer;
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
    @media (max-width: 1100px) {
      // position: relative;
      // top: 0;
      // left: 0;
    }
    p {
      color: #283149;
      font-family: "LXGW WenKai Mono TC", serif;
      font-size: 20px;
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
</style>
