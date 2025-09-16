<template>
  <div v-if="isVisible" class="artwork-selector-overlay" @click="closeSelector">
    <div class="artwork-selector" @click.stop>
      <!-- 關閉按鈕 -->
      <button class="close-btn" @click="closeSelector">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m18 6-12 12M6 6l12 12"/>
        </svg>
      </button>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>{{ $t('common.loading') || 'Loading...' }}</p>
      </div>

      <div v-else class="selector-content">
        <h2 class="selector-title">
          {{ locale === 'zh' ? '選擇要查看的作品' : 'Select Artwork to View' }}
        </h2>
        
        <p class="selector-description">
          {{ locale === 'zh' ? '此位置有多個作品，請選擇您想要查看的作品：' : 'This location contains multiple artworks. Please select the one you want to view:' }}
        </p>

        <div class="artwork-list">
          <div
            v-for="artwork in artworkList"
            :key="artwork.id"
            class="artwork-item"
            @click="selectArtwork(String(artwork.id))"
          >
            <div class="artwork-thumbnail">
              <img 
                :src="getArtworkImage(artwork.id)" 
                :alt="artwork.title"
                @error="onImageError"
                class="thumbnail-img"
              />
            </div>
            <div class="artwork-details">
              <h3 class="artwork-title">{{ artwork.title }}</h3>
              <p class="artwork-meta">{{ artwork.artist }} · {{ artwork.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import i18n from '../i18n';

const { locale } = useI18n(); // 移除未使用的 't'

// Props
interface Props {
  isVisible: boolean;
  artworkIds: string;
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  artworkIds: ''
});

// Emits
const emit = defineEmits<{
  close: [];
  select: [artworkId: string];
}>();

const artworkList = ref<any[]>([]);
const loading = ref(false);

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

// 獲取藝術品圖片路徑
const getArtworkImage = (id: string | number) => {
  // 添加前導零，確保是兩位數格式 (如 01.webp, 09.webp)
  const paddedId = String(id).padStart(2, '0');
  return `/artworks/${paddedId}.webp`;
};

// 圖片加載錯誤處理
const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/artworks/placeholder.svg';
};

// 根據IDs獲取藝術品列表
const fetchArtworks = async (artworkIds: string) => {
  if (!artworkIds) return;
  
  try {
    loading.value = true;
    
    // 確保 artworkIds 是字符串類型，分割複合標籤獲取所有ID
    const ids = String(artworkIds).split('&');
    
    // 根據當前語言獲取對應的JSON文件
    const localeCode = locale.value;
    const response = await fetch(`/locales/${localeCode}/artworksIntro.json`);
    
    if (!response.ok) {
      throw new Error('Failed to load artwork data');
    }
    
    const artworksData = await response.json();
    
    // 查找對應的所有藝術品
    const foundArtworks = artworksData.filter((item: any) => 
      ids.includes(String(item.id))
    );
    
    // 按照原始順序排列
    artworkList.value = ids.map(id => 
      foundArtworks.find((artwork: any) => String(artwork.id) === id)
    ).filter(Boolean);
    
  } catch (err) {
    console.error('Error fetching artworks:', err);
  } finally {
    loading.value = false;
  }
};

// 選擇作品
const selectArtwork = (artworkId: string | number) => {
  emit('select', String(artworkId));
};

// 關閉選擇器
const closeSelector = () => {
  emit('close');
};

// 監聽 artworkIds 變化
watch(() => props.artworkIds, (newIds) => {
  if (newIds && props.isVisible) {
    fetchArtworks(newIds);
  }
});

// 監聽顯示狀態變化
watch(() => props.isVisible, (isVisible) => {
  if (isVisible && props.artworkIds) {
    fetchArtworks(props.artworkIds);
  }
});

// 監聽語言變化，重新獲取數據
watch(locale, async (newLocale) => {
  await loadLocaleMessages(newLocale);
  if (props.artworkIds && props.isVisible) {
    fetchArtworks(props.artworkIds);
  }
});

onMounted(async () => {
  await loadLocaleMessages(locale.value);
});
</script>

<style scoped lang="scss">
.artwork-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  padding: 20px;
}

.artwork-selector {
  background: white;
  border-radius: 12px;
  max-width: 700px;
  max-height: 80vh;
  width: 100%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
      transform: scale(1.1);
    }
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    text-align: center;
    padding: 40px;

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #5659a5;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    p {
      color: #666;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .selector-content {
    padding: 40px 30px 30px;

    .selector-title {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 12px;
      font-weight: 600;
      text-align: center;
    }

    .selector-description {
      color: #666;
      text-align: center;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    .artwork-list {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .artwork-item {
        display: flex;
        align-items: center;
        padding: 16px;
        border: 2px solid #f0f0f0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: #5659a5;
          background: #f8f9ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(86, 89, 165, 0.15);
        }

        .artwork-thumbnail {
          width: 80px;
          height: 60px;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 16px;
          flex-shrink: 0;
          background: #f5f5f5;

          .thumbnail-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .artwork-details {
          flex: 1;

          .artwork-title {
            font-size: 1.1rem;
            color: #333;
            margin-bottom: 4px;
            font-weight: 500;
          }

          .artwork-meta {
            color: #666;
            font-size: 0.9rem;
            margin: 0;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    margin: 10px;
    max-height: 90vh;

    .selector-content {
      padding: 30px 20px 20px;

      .artwork-list .artwork-item {
        padding: 12px;

        .artwork-thumbnail {
          width: 60px;
          height: 45px;
          margin-right: 12px;
        }

        .artwork-details {
          .artwork-title {
            font-size: 1rem;
          }

          .artwork-meta {
            font-size: 0.85rem;
          }
        }
      }
    }
  }
}
</style>