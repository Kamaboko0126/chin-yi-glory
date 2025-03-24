<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Carousel from "primevue/carousel";
import { useI18n } from "vue-i18n";
import i18n from "../../i18n";

const { locale, t } = useI18n();
async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`../../locales/${locale}/schoolIntro.json`);
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

const photo01 = new URL("../../assets/school/02.jpg", import.meta.url).href;
const photo03 = new URL("../../assets/school/04.jpg", import.meta.url).href;

interface Photo {
  image: string;
  description: string;
}

const photos = ref<Photo[]>([]);

function updatePhotos() {
  photos.value = [
    {
      image: photo01,
      description: t("pic1"),
    },
    // {
    //   image: photo02,
    //   description: t("pic2"),
    // },
    {
      image: photo03,
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
