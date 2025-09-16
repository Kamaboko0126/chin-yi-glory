<template>
  <div v-if="isVisible" class="artwork-modal-overlay" @click="closeModal">
    <div class="artwork-modal" @click.stop>
      <!-- 關閉按鈕 -->
      <button class="close-btn" @click="closeModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m18 6-12 12M6 6l12 12"/>
        </svg>
      </button>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>{{ $t('common.loading') || 'Loading...' }}</p>
      </div>

      <div v-else-if="error" class="error">
        <h2>{{ $t('common.error') || 'Error' }}</h2>
        <p>{{ error }}</p>
      </div>

      <div v-else-if="artwork" class="artwork-content">
        <!-- 藝術品圖片 -->
        <div class="artwork-image">
          <img 
            :src="getCurrentImage" 
            :alt="artwork.title"
            @error="onImageError"
            class="artwork-img"
          />
          
          <!-- 圖片切換按鈕 -->
          <div v-if="!loading && photoCheckCompleted" class="image-toggle-controls">
            <!-- 只有現實照片時才顯示兩個切換按鈕 -->
            <template v-if="hasRealPhoto">
              <button 
                @click="() => { if (hasRealPhoto) showRealPhoto = false; }"
                class="toggle-btn"
                :class="{ active: !showRealPhoto }"
              >
                {{ $t('artwork.artworkView') || '藝術作品' }}
              </button>
              <button 
                @click="() => { if (hasRealPhoto) showRealPhoto = true; }"
                class="toggle-btn"
                :class="{ active: showRealPhoto }"
              >
                {{ $t('artwork.realPhotoView') || '現實對比' }}
              </button>
            </template>
            <!-- 沒有現實照片時只顯示藝術作品標籤 -->
            <template v-else>
              <div class="single-view-label">
                {{ $t('artwork.artworkView') || '藝術作品' }}
              </div>
            </template>
          </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import i18n from '../i18n';

const { locale } = useI18n(); // 移除未使用的 't'

// Props
interface Props {
  isVisible: boolean;
  artworkId: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  artworkId: ''
});

// Emits
const emit = defineEmits<{
  close: [];
}>();

const artwork = ref<any>(null);
const loading = ref(false);
const error = ref<string>('');

// 照片對比功能
const showRealPhoto = ref(false);
const hasRealPhoto = ref(false);
const photoCheckCompleted = ref(false); // 新增：追蹤照片檢查是否完成

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
  return String(props.artworkId).includes('&');
});

// 獲取藝術品圖片路徑
const getArtworkImage = (id: string | number) => {
  // 如果是複合標籤，取第一個ID
  const imageId = String(id).split('&')[0];
  // 添加前導零，確保是兩位數格式 (如 01.webp, 09.webp)
  const paddedId = imageId.padStart(2, '0');
  return `/artworks/${paddedId}.webp`;
};

// 獲取現實照片路徑
const getRealPhotoImage = (id: string | number) => {
  // 如果是複合標籤，取第一個ID
  const imageId = String(id).split('&')[0];
  // 添加前導零，確保是兩位數格式 (如 01.webp, 09.webp)
  const paddedId = imageId.padStart(2, '0');
  return `/photos/${paddedId}.webp`;
};

// 檢查現實照片是否存在
const checkRealPhotoExists = async (id: string | number) => {
  try {
    const imageId = String(id).split('&')[0];
    const paddedId = imageId.padStart(2, '0');
    const photoUrl = `/photos/${paddedId}.webp`;
    
    console.log(`Checking photo existence: ${photoUrl}`);
    
    // 創建一個 Image 對象來測試圖片是否能載入
    const testImage = new Image();
    
    const imageLoadPromise = new Promise<boolean>((resolve) => {
      testImage.onload = () => {
        console.log(`Photo ${photoUrl} loaded successfully`);
        resolve(true);
      };
      
      testImage.onerror = () => {
        console.log(`Photo ${photoUrl} failed to load`);
        resolve(false);
      };
      
      // 設置超時
      setTimeout(() => {
        console.log(`Photo ${photoUrl} load timeout`);
        resolve(false);
      }, 3000);
    });
    
    testImage.src = photoUrl;
    const exists = await imageLoadPromise;
    
    console.log(`Photo ${photoUrl} check result: exists=${exists}`);
    return exists;
    
  } catch (error) {
    console.log(`Error checking photo for ID ${id}:`, error);
    return false;
  }
};

// 獲取當前顯示的圖片路徑
const getCurrentImage = computed(() => {
  if (!artwork.value) return '';
  // 只有在有現實照片且用戶選擇顯示現實照片時，才返回現實照片路徑
  return (showRealPhoto.value && hasRealPhoto.value) ? getRealPhotoImage(artwork.value.id) : getArtworkImage(artwork.value.id);
});

// 圖片加載錯誤處理
const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  
  // 如果當前顯示的是現實照片且載入失敗
  if (showRealPhoto.value && hasRealPhoto.value) {
    console.log('Real photo failed to load, updating state');
    // 立即更新狀態
    showRealPhoto.value = false;
    hasRealPhoto.value = false;
    photoCheckCompleted.value = true; // 保持檢查完成狀態
    
    // 切換回藝術作品圖片
    if (artwork.value) {
      target.src = getArtworkImage(artwork.value.id);
    }
  } else {
    // 如果是藝術作品載入失敗，使用 placeholder
    target.src = '/artworks/placeholder.svg';
  }
};

// 根據ID獲取藝術品資料
const fetchArtwork = async (artworkId: string | number) => {
  if (!artworkId) return;
  
  try {
    loading.value = true;
    error.value = '';
    
    // 完全重置所有狀態，防止顯示上一個作品的狀態
    artwork.value = null;
    showRealPhoto.value = false;
    hasRealPhoto.value = false;
    photoCheckCompleted.value = false; // 重置照片檢查狀態
    
    // 確保 artworkId 是字符串類型，處理複合標籤，取第一個ID
    const primaryId = String(artworkId).split('&')[0];
    
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
      console.log(`Found artwork: ${foundArtwork.title} (ID: ${foundArtwork.id})`);
      
      // 先檢查是否有對應的現實照片
      const photoExists = await checkRealPhotoExists(foundArtwork.id);
      
      // 同時更新所有相關狀態
      hasRealPhoto.value = photoExists;
      photoCheckCompleted.value = true;
      artwork.value = foundArtwork;
      
      console.log(`Final state: hasRealPhoto=${hasRealPhoto.value}, photoCheckCompleted=${photoCheckCompleted.value}`);
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

// 關閉彈窗
const closeModal = () => {
  emit('close');
};

// 監聽 artworkId 變化
watch(() => props.artworkId, (newId) => {
  if (newId && props.isVisible) {
    fetchArtwork(newId);
  }
});

// 監聽顯示狀態變化
watch(() => props.isVisible, (isVisible) => {
  if (isVisible && props.artworkId) {
    fetchArtwork(props.artworkId);
  }
});

// 監聽語言變化，重新獲取數據
watch(locale, async (newLocale) => {
  await loadLocaleMessages(newLocale);
  if (props.artworkId && props.isVisible) {
    fetchArtwork(props.artworkId);
  }
});

onMounted(async () => {
  await loadLocaleMessages(locale.value);
});
</script>

<style scoped lang="scss">
.artwork-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.artwork-modal {
  background: white;
  border-radius: 12px;
  max-width: 1200px; /* 從 900px 增加到 1200px */
  max-height: 90vh;
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

  .loading, .error {
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

    h2 {
      color: #333;
      margin-bottom: 16px;
    }

    p {
      color: #666;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .artwork-content {
    padding: 0;

    .artwork-image {
      position: relative;
      background: #f5f5f5;

      .artwork-img {
        width: 100%;
        height: auto;
        max-height: 60vh; /* 從 50vh 增加到 60vh */
        object-fit: contain;
        display: block;
      }

      .image-toggle-controls {
        position: absolute;
        top: 16px;
        left: 16px;
        display: flex;
        gap: 8px;
        z-index: 5;

        .toggle-btn {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);

          &:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: translateY(-1px);
          }

          &.active {
            background: #5659a5;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(86, 89, 165, 0.3);
          }
        }

        .single-view-label {
          background: #5659a5;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px rgba(86, 89, 165, 0.3);
        }
      }
    }

    .artwork-info {
      padding: 30px;

      .artwork-title {
        font-size: 2rem;
        color: #333;
        margin-bottom: 20px;
        font-weight: 600;

        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }

      .artwork-meta {
        margin-bottom: 30px;

        .meta-item {
          display: flex;
          margin-bottom: 8px;
          align-items: center;

          .meta-label {
            font-weight: 600;
            color: #555;
            min-width: 70px;
            margin-right: 12px;
            font-size: 0.9rem;
          }

          .meta-value {
            color: #333;
            font-size: 1rem;
          }
        }
      }

      .artwork-description {
        h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .description-content {
          /* 移除 max-height 和 overflow-y 限制，讓描述完整顯示 */

          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 12px;
            font-size: 0.95rem;
            text-align: justify;
          }
        }
      }

      .multiple-artwork-info {
        margin-top: 20px;
        padding: 12px;
        background: #f0f8ff;
        border-left: 4px solid #5659a5;
        border-radius: 4px;

        .info-text {
          color: #5659a5;
          font-weight: 500;
          margin: 0;
          font-size: 0.9rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    margin: 10px;
    max-height: 95vh;

    .artwork-content {
      .artwork-image .image-toggle-controls {
        top: 10px;
        left: 10px;
        
        .toggle-btn {
          padding: 6px 12px;
          font-size: 0.8rem;
        }

        .single-view-label {
          padding: 6px 12px;
          font-size: 0.8rem;
        }
      }
      
      .artwork-info {
        padding: 20px;
      }
    }
  }
}
</style>