<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import CardGroup1 from "../components/CurationIntro/CardGroup1.vue";
import CardGroup2 from "../components/CurationIntro/CardGroup2.vue";
import Skeleton from "primevue/skeleton";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

const { locale, t } = useI18n();

async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`../locales/${locale}/curationIntro.json`);
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages.default,
    });
  } catch (error) {}
}

const banner = new URL("../assets/curation/01.jpg", import.meta.url).href;
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
      <div class="text">
        <p>
          {{ t("section1") }}
        </p>
        <p>
          {{ t("section2") }}
        </p>
      </div>

      <CardGroup1 />

      <div class="text">
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
      </div>

      <CardGroup2 />

      <div class="text">
        <p>
          {{ t("section7") }}
        </p>
        <p>
          {{ t("section8") }}
        </p>
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
      object-fit: cover;
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
    }
  }
}
</style>
