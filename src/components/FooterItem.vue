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
  } catch (error) {}
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
    <div class="content">
      <p>
        {{ t("footer1") }}
      </p>
      <p>
        {{ t("footer2") }}
        <a href="https://chinyihalloffame.blogspot.com/p/blog-page_7.html"
          >https://chinyihalloffame.blogspot.com/p/blog-page_7.html</a
        >
        {{ t("footer3") }}
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background: #d2d2d213;
  padding: 0rem 3rem;
  width: 100%;
  @media (max-width: 1400px) {
    padding: 0rem 3rem;
  }
  @media (max-width: 1199px) {
    padding: 0rem 3rem;
  }
  @media (max-width: 767px) {
    padding: 0rem 3rem;
  }
  @media (max-width: 575px) {
    padding: 0rem 3rem;
  }
  .content {
    padding: 1.5rem 0rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1728px;
    border-top: 1px solid #e2e8f0;
    margin: 0 auto;
  }
  p {
    color: #334155;
    font-weight: 500;
    &:nth-child(2) {
      margin-top: 5px;
    }
  }
  a {
    color: #334155;
    font-weight: 500;
    text-decoration: none;
    word-break: break-word; /* 允許長單字（如 URL）換行 */
    overflow-wrap: break-word; /* 兼容性處理 */
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
