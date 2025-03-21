<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

const { locale, t } = useI18n();

async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`../locales/${locale}/footer.json`);
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages.default,
    });
    console.log(`Locale messages for ${locale} loaded successfully.`);
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
  }
}

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
  <footer>
    <p>
      {{ t("footer1") }}
    </p>
    <p>
      {{ t("footer2")
      }}<a href="https://chinyihalloffame.blogspot.com/p/blog-page_7.html"
        >https://chinyihalloffame.blogspot.com/p/blog-page_7.html</a
      >
      {{ t("footer3") }}
    </p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  border-top: 1px solid #e2e8f0;
  max-width: 1728px;
  margin: 0 auto;
  padding: 2rem 4rem;
  display: flex;
  flex-wrap: wrap;
  p {
    color: #334155;
    line-height: 120%;
    font-weight: 500;
    font-size: 16px;
    &:nth-child(2) {
      margin-top: 5px;
    }
  }
  a {
    color: #334155;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
