<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Carousel from "primevue/carousel";
import { useI18n } from "vue-i18n";
import i18n from "../../i18n";

// 定義 props 接口
interface CardItem {
  image: string;
  descriptionKey: string;
}

interface Props {
  items: CardItem[];
  localeFile: string;
  autoplayInterval?: number;
  numVisible?: number;
  numScroll?: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoplayInterval: 4000,
  numVisible: 1,
  numScroll: 1,
});

const { locale, t } = useI18n();

// 響應式資料
const photos = ref<Array<{ image: string; description: string }>>([]);

// 載入語言文件
async function loadLocaleMessages(targetLocale: string) {
  try {
    const messages = await import(/* @vite-ignore */ `../../locales/${targetLocale}/${props.localeFile}.json`);
    i18n.global.setLocaleMessage(targetLocale, {
      ...i18n.global.getLocaleMessage(targetLocale),
      ...messages.default,
    });
    console.log(`Successfully loaded ${targetLocale} messages for ${props.localeFile}`);
  } catch (error) {
    console.error(`Failed to load ${targetLocale} messages for ${props.localeFile}:`, error);
  }
}

// 更新照片資料
function updatePhotos() {
  photos.value = props.items.map(item => {
    console.log('Loading image:', item.image); // 調試用
    return {
      image: item.image,
      description: t(item.descriptionKey),
    };
  });
}

// 響應式選項
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: props.numVisible,
    numScroll: props.numScroll,
  },
  {
    breakpoint: "1199px",
    numVisible: props.numVisible,
    numScroll: props.numScroll,
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

// 初始化
onMounted(async () => {
  await loadLocaleMessages(locale.value);
  updatePhotos();
});

// 監聽語言變化
watch(locale, async (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
  await loadLocaleMessages(newLocale);
  updatePhotos();
});

// 監聽 props 變化
watch(() => props.items, () => {
  updatePhotos();
}, { deep: true });
</script>

<template>
  <Carousel
    :value="photos"
    :numVisible="numVisible"
    :numScroll="numScroll"
    :responsiveOptions="responsiveOptions"
    :autoplayInterval="autoplayInterval"
    circular
    class="pc"
  >
    <template #item="slotProps">
      <div class="pc-item">
        <div class="pc-image">
          <img 
            :src="slotProps.data.image" 
            :alt="slotProps.data.description"
            @error="(e) => console.error('Image failed to load:', slotProps.data.image, e)"
            @load="() => console.log('Image loaded successfully:', slotProps.data.image)"
          />
        </div>
        <div class="pc-description">
          <p>{{ slotProps.data.description }}</p>
        </div>
      </div>
    </template>
  </Carousel>
</template>

<style scoped lang="scss">
// 簡約風格變數
$white: #ffffff;
$text-dark: #333333;
$text-light: #666666;
$border-light: #f0f0f0;

.pc {
  margin: 40px 0;
  
  .pc-item {
    background: $white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    margin: 0 10px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .pc-image {
      position: relative;
      overflow: hidden;
      aspect-ratio: 16/9;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .pc-description {
      padding: 20px;
      background: $white;

      p {
        margin: 0;
        color: $text-dark;
        font-size: 1rem;
        line-height: 1.6;
        text-align: center;
        font-weight: 400;

        @media (max-width: 768px) {
          font-size: 0.9rem;
          padding: 0 10px;
        }
      }
    }
  }
}

// PrimeVue Carousel 樣式覆蓋
:deep(.p-carousel) {
  .p-carousel-content {
    background: transparent;
  }

  .p-carousel-indicators {
    margin-top: 20px;

    .p-carousel-indicator {
      background: rgba(51, 51, 51, 0.3);
      border-radius: 50%;
      width: 10px;
      height: 10px;
      margin: 0 6px;
      transition: all 0.3s ease;

      &.p-highlight {
        background: $text-dark;
      }
    }
  }

  .p-carousel-prev,
  .p-carousel-next {
    background: rgba(255, 255, 255, 0.9);
    color: $text-dark;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: $white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
    }
  }
}

// 響應式設計
@media (max-width: 768px) {
  .pc {
    margin: 30px 0;

    .pc-item {
      margin: 0 5px;

      .pc-description {
        padding: 15px;
      }
    }
  }
}
</style>
