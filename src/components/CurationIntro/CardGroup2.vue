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
  } catch (error) {}
}
onMounted(() => {
  loadLocaleMessages(locale.value).then(() => {
    updatePhotos();
  });
});

// 監聽 locale 的變化，當語言切換時重新載入資料
watch(locale, (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
  loadLocaleMessages(newLocale).then(() => {
    updatePhotos();
  });
});

const photog2_01 = new URL("../../assets/curation/05.jpg", import.meta.url)
  .href;
const photog2_02 = new URL("../../assets/curation/06.jpg", import.meta.url)
  .href;
const photog2_03 = new URL("../../assets/curation/07.jpg", import.meta.url)
  .href;
const photog2_04 = new URL("../../assets/curation/08.jpg", import.meta.url)
  .href;
const photog2_05 = new URL("../../assets/curation/09.jpg", import.meta.url)
  .href;
const photog2_06 = new URL("../../assets/curation/10.jpg", import.meta.url)
  .href;
const photog2_07 = new URL("../../assets/curation/11.jpg", import.meta.url)
  .href;
const photog2_08 = new URL("../../assets/curation/12.jpg", import.meta.url)
  .href;
const photog2_09 = new URL("../../assets/curation/13.jpg", import.meta.url)
  .href;

interface Product {
  image: string;
  description: string;
}

const photos = ref<Product[]>([]);

function updatePhotos() {
  photos.value = [
    {
      image: photog2_01,
      description: t("pic4"),
    },
    {
      image: photog2_02,
      description: t("pic5"),
    },
    {
      image: photog2_03,
      description: t("pic6"),
    },
    {
      image: photog2_04,
      description: t("pic7"),
    },
    {
      image: photog2_05,
      description: t("pic8"),
    },
    {
      image: photog2_06,
      description: t("pic9"),
    },
    {
      image: photog2_07,
      description: t("pic10"),
    },
    {
      image: photog2_08,
      description: t("pic11"),
    },
    {
      image: photog2_09,
      description: t("pic12"),
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
    :value="photos"
    :numVisible="1"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    :autoplayInterval="4000"
    circular
    class="pc"
  >
    <template #item="slotProps">
      <div class="pc-item">
        <div class="pc-image">
          <img :src="slotProps.data.image" />
        </div>
        <p class="title">{{ slotProps.data.description }}</p>
      </div>
    </template>
  </Carousel>
  <div class="phone">
    <div class="phone-item" v-for="photo in photos" :key="photo.image">
      <img :src="photo.image" />
      <p class="title">{{ photo.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pc {
  @media (max-width: 575px) {
    display: none;
  }
  .pc-item {
    max-width: 100%;
    .pc-image {
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
      // @media (max-width: 575px) {
      //   height: 15vh;
      // }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

.phone {
  display: none;
  .phone-item {
    &:not(:first-child) {
      margin-top: 25px;
    }
  }
  @media (max-width: 575px) {
    display: block;
    width: 100%;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
