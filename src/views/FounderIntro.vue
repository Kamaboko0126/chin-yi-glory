<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import CardGroup1 from "../components/FounderIntro/CardGroup1.vue";
import Skeleton from "primevue/skeleton";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

const { locale, t } = useI18n();

async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`../locales/${locale}/founderIntro.json`);
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages.default,
    });
  } catch (error) {}
}

const banner = new URL("../assets/school/01.jpg", import.meta.url).href;
const bannerLoaded = ref(false);

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
  <section>
    <div class="container">
      <div class="text">
        <h1 class="section-title">
          {{ t("title1") }}
        </h1>
      </div>
      <div class="banner">
        <img :src="banner" @load="bannerLoaded = true" />
        <Skeleton
          class="banner-skeleton"
          width="100%"
          height="52vh"
          borderRadius="0px"
          v-if="!bannerLoaded"
        ></Skeleton>
      </div>
      <div class="title">
        <p class="title">{{ t("banner") }}</p>
      </div>
      <div class="text">
        <p>
          {{ t("section1") }}
        </p>
      </div>
      <div class="text">
        <h1 class="section-title">
          {{ t("title2") }}
        </h1>
        <p>
          {{ t("section1") }}
        </p>
        <p>
          {{ t("section2") }}
        </p>
        <p>
          {{ t("section3") }}
        </p>
        <p>
          {{ t("section4") }}
        </p>
        <p>
          {{ t("section5") }}
        </p>
        <p>
          {{ t("section6") }}
        </p>
        <p>
          {{ t("section7") }}
        </p>
        <p>
          {{ t("section8") }}
        </p>
        <p>
          {{ t("section9") }}
        </p>
        <p>
          {{ t("section10") }}
        </p>
        <p>
          {{ t("section11") }}
        </p>
      </div>

      <div class="text">
        <h1 class="section-title">
          {{ t("title3") }}
        </h1>
        <p>
          {{ t("section12") }}
        </p>
        <p>
          {{ t("section13") }}
        </p>
        <p>
          {{ t("section14") }}
        </p>
        <p>
          {{ t("section15") }}
        </p>
        <p>
          {{ t("section16") }}
        </p>
        <p>
          {{ t("section17") }}
        </p>
        <p>
          {{ t("section18") }}
        </p>
        <p>
          {{ t("section19") }}
        </p>
        <p>
          {{ t("section20") }}
        </p>
        <p>
          {{ t("section21") }}
        </p>
        <p>
          {{ t("section22") }}
        </p>
        <p>
          {{ t("section23") }}
        </p>
        <CardGroup1 />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #d2d2d213;
  .container {
    display: flex;
    width: 100%;
    max-width: 1200px;
    flex-direction: column;
    padding: 30px;
    .banner {
      width: 100%;
      height: 50vh;
      @media (max-width: 950px) {
        height: 40vh;
      }
      @media (max-width: 600px) {
        height: 25vh;
      }
      .banner-skeleton {
        transform: translateY(-100%);
      }
    }
    img {
      width: 100%;
      height: 50vh;
      object-fit: contain;
      object-position: top;
      @media (max-width: 950px) {
        height: 40vh;
      }
      @media (max-width: 600px) {
        height: 25vh;
      }
    }
    .text {
      padding: 20px 0;
      p {
        margin-bottom: 20px;
        color: #283149;
        font-family: "LXGW WenKai Mono TC", serif;
      }
      a {
        color: #283149;
        text-decoration: none;
        &:hover {
          text-decoration: #283149 underline;
        }
      }
    }
  }
}
</style>
