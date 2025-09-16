<template>
  <div class="artwork-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>{{ $t('common.loading') || 'Loading...' }}</p>
      </div>

      <div v-else-if="error" class="error">
        <h2>{{ $t('common.error') || 'Error' }}</h2>
        <p>{{ error }}</p>
        <button @click="$router.go(-1)" class="back-btn">
          {{ $t('common.back') || 'Go Back' }}
        </button>
      </div>

      <div v-else-if="artwork" class="artwork-content">
        <!-- 返回按鈕 -->
        <button @click="$router.go(-1)" class="back-btn">
          ← {{ $t('common.back') || 'Back' }}
        </button>

        <div class="artwork-main">
          <!-- 藝術品圖片 -->
          <div class="artwork-image">
            <img 
              :src="getArtworkImage(artwork.id)" 
              :alt="artwork.title"
              @error="onImageError"
              class="artwork-img"
            />
          </div>

          <!-- 藝術品信息 -->
          <div class="artwork-info">
            <h1 class="artwork-title">{{ artwork.title }}</h1>
            
            <div class="artwork-meta">
              <div class="meta-item">
                <span class="meta-label">{{ $t('artwork.artist') || 'Artist' }}:</span>
                <span class="meta-value">{{ artwork.artist }}</span>
              </div>
              
              <div class="meta-item">
                <span class="meta-label">{{ $t('artwork.year') || 'Year' }}:</span>
                <span class="meta-value">{{ artwork.year }}</span>
              </div>

              <div class="meta-item">
                <span class="meta-label">{{ $t('artwork.id') || 'ID' }}:</span>
                <span class="meta-value">{{ artwork.id }}</span>
              </div>
            </div>

            <!-- 藝術品描述 -->
            <div class="artwork-description">
              <h3>{{ $t('artwork.description') || 'Description' }}</h3>
              <div class="description-content">
                <p v-for="(paragraph, index) in artwork.description" :key="index">
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- 多作品標籤指示 -->
            <div v-if="isMultipleArtwork" class="multiple-artwork-info">
              <p class="info-text">
                {{ $t('artwork.multipleInfo') || 'This location contains multiple artworks' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>{{ $t('artwork.notFound') || 'Artwork Not Found' }}</h2>
        <p>{{ $t('artwork.notFoundDescription') || 'The artwork you are looking for does not exist.' }}</p>
        <button @click="$router.go(-1)" class="back-btn">
          {{ $t('common.back') || 'Go Back' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router'; // 移除未使用的 useRouter
import { useI18n } from 'vue-i18n';
import i18n from '../../i18n';

interface Props {
  id?: string;
}

const props = defineProps<Props>();
const route = useRoute();
const { locale } = useI18n(); // 移除未使用的 router 和 t

const artwork = ref<any>(null);
const loading = ref(true);
const error = ref<string>('');

// 獲取作品ID (優先使用props，其次使用query參數)
const artworkId = computed(() => {
  return props.id || (route.query.id as string) || '';
});

// 載入多語言資源
const loadLocaleMessages = async (targetLocale: string) => {
  try {
    const [commonResponse, artworkResponse] = await Promise.all([
      fetch(`/locales/${targetLocale}/common.json`),
      fetch(`/locales/${targetLocale}/artwork.json`)
    ]);

    if (commonResponse.ok && artworkResponse.ok) {
      const [commonMessages, artworkMessages] = await Promise.all([
        commonResponse.json(),
        artworkResponse.json()
      ]);

      i18n.global.setLocaleMessage(targetLocale, {
        ...i18n.global.getLocaleMessage(targetLocale),
        common: commonMessages,
        artwork: artworkMessages,
      });
    }
  } catch (error) {
    console.error('Failed to load locale messages:', error);
  }
};

// 檢查是否為複合標籤（多個作品在同一位置）
const isMultipleArtwork = computed(() => {
  return artworkId.value.includes('&');
});

// 獲取藝術品圖片路徑
const getArtworkImage = (id: string | number) => {
  // 如果是複合標籤，取第一個ID
  const imageId = String(id).split('&')[0];
  return `/artworks/${imageId.padStart(2, '0')}.webp`;
};

// 圖片加載錯誤處理
const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/artworks/placeholder.svg'; // 可以設置一個預設圖片
};

// 根據ID獲取藝術品資料
const fetchArtwork = async (artworkId: string) => {
  try {
    loading.value = true;
    error.value = '';
    
    // 處理複合標籤，取第一個ID
    const primaryId = artworkId.split('&')[0];
    
    // 根據當前語言獲取對應的JSON文件
    const localeCode = locale.value;
    const response = await fetch(`/locales/${localeCode}/artworksIntro.json`);
    
    if (!response.ok) {
      throw new Error('Failed to load artwork data');
    }
    
    const artworksData = await response.json();
    
    // 查找對應的藝術品
    const foundArtwork = artworksData.find((item: any) => String(item.id) === primaryId);
    
    if (foundArtwork) {
      artwork.value = foundArtwork;
    } else {
      error.value = 'Artwork not found';
    }
    
  } catch (err) {
    console.error('Error fetching artwork:', err);
    error.value = 'Failed to load artwork data';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  // 載入多語言資源
  await loadLocaleMessages(locale.value);
  
  if (artworkId.value) {
    fetchArtwork(artworkId.value);
  } else {
    error.value = 'No artwork ID provided';
    loading.value = false;
  }
});

// 監聽語言變化，重新獲取數據
watch(locale, async (newLocale) => {
  await loadLocaleMessages(newLocale);
  if (artworkId.value) {
    fetchArtwork(artworkId.value);
  }
});

// 監聽作品ID變化
watch(artworkId, (newId) => {
  if (newId) {
    fetchArtwork(newId);
  }
});
</script>

<style scoped lang="scss">
.artwork-detail {
  min-height: 100vh;
  background: #fafafa;
  padding: 20px 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .loading, .error, .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #5659a5;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    h2 {
      color: #333;
      margin-bottom: 16px;
    }

    p {
      color: #666;
      margin-bottom: 20px;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .back-btn {
    background: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    margin-bottom: 30px;

    &:hover {
      background: #555;
    }
  }

  .artwork-content {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .artwork-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 40px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 30px;
      padding: 20px;
    }
  }

  .artwork-image {
    .artwork-img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .artwork-info {
    .artwork-title {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 30px;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .artwork-meta {
      margin-bottom: 40px;

      .meta-item {
        display: flex;
        margin-bottom: 12px;
        align-items: center;

        .meta-label {
          font-weight: 600;
          color: #555;
          min-width: 80px;
          margin-right: 16px;
        }

        .meta-value {
          color: #333;
          font-size: 1.1rem;
        }
      }
    }

    .artwork-description {
      h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 20px;
        font-weight: 500;
      }

      .description-content {
        p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 16px;
          font-size: 1rem;
          text-align: justify;
        }
      }
    }

    .multiple-artwork-info {
      margin-top: 30px;
      padding: 16px;
      background: #f0f8ff;
      border-left: 4px solid #5659a5;
      border-radius: 4px;

      .info-text {
        color: #5659a5;
        font-weight: 500;
        margin: 0;
      }
    }
  }
}
</style>