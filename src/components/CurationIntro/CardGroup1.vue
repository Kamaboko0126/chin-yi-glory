<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Carousel from "primevue/carousel";
import { useI18n } from "vue-i18n";
import i18n from "../../i18n";

const { locale, t } = useI18n();
async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`../../locales/${locale}/curationIntro.json`);
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
  loadLocaleMessages(locale.value).then(() => {
    updateProducts();
  });
});

// 監聽 locale 的變化，當語言切換時重新載入資料
watch(locale, (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
  loadLocaleMessages(newLocale).then(() => {
    updateProducts();
  });
});

const photog2_01 = new URL("../../assets/curation/02.jpg", import.meta.url)
  .href;
const photog2_02 = new URL("../../assets/curation/03.jpg", import.meta.url)
  .href;
const photog2_03 = new URL("../../assets/curation/04.jpg", import.meta.url)
  .href;

interface Product {
  image: string;
  description: string;
}

const products = ref<Product[]>([]);

function updateProducts() {
  products.value = [
    {
      image: photog2_01,
      description: t("pic1"),
    },
    {
      image: photog2_02,
      description: t("pic2"),
    },
    {
      image: photog2_03,
      description: t("pic3"),
    },
  ];
}

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <Carousel
    :value="products"
    :numVisible="1"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    :autoplayInterval="4000"
    circular
  >
    <template #item="slotProps">
      <div class="item">
        <div class="photo">
          <img :src="slotProps.data.image" />
        </div>
        <p class="title">{{ slotProps.data.description }}</p>
      </div>
    </template>
  </Carousel>
</template>

<style scoped lang="scss">
.item {
  max-width: 100%;
  .photo {
    width: 100%;
    height: 60vh;
    @media (max-width: 1400px) {
      height: 50vh;
    }
    @media (max-width: 1199px) {
      height: 40vh;
    }
    @media (max-width: 767px) {
      height: 26vh;
    }
    @media (max-width: 575px) {
      height: 15vh;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .title {
    padding: 10px 0 0 0;
    text-align: center;
    @media (max-width: 575px) {
      display: -webkit-box; /* 必須使用這個屬性 */
      -webkit-box-orient: vertical; /* 垂直方向排列 */
      -webkit-line-clamp: 1; /* 顯示的行數 */
      overflow: hidden; /* 隱藏超出部分 */
      text-overflow: ellipsis; /* 顯示省略號 */
    }
  }
}
</style>
