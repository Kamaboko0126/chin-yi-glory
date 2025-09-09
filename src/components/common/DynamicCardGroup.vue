<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
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
  showThumbnails?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoplayInterval: 8000, // 增加到8秒
  showThumbnails: true,
});

const { locale, t } = useI18n();

// 響應式資料
const photos = ref<Array<{ image: string; description: string }>>([]);
const currentIndex = ref(0);
const isAutoplay = ref(true);
const intervalId = ref<number | null>(null);
const expandedDescriptions = ref<Set<number>>(new Set()); // 追蹤哪些描述已展開

// 載入語言文件
async function loadLocaleMessages(targetLocale: string) {
  try {
    const response = await fetch(`/locales/${targetLocale}/${props.localeFile}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const messages = await response.json();
    
    i18n.global.setLocaleMessage(targetLocale, {
      ...i18n.global.getLocaleMessage(targetLocale),
      ...messages,
    });
    console.log(`Successfully loaded ${targetLocale} messages for ${props.localeFile}`);
  } catch (error) {
    console.error(`Failed to load ${targetLocale} messages for ${props.localeFile}:`, error);
  }
}

// 更新照片資料
function updatePhotos() {
  photos.value = props.items.map(item => {
    console.log('Loading image:', item.image);
    return {
      image: item.image,
      description: t(item.descriptionKey),
    };
  });
}

// 切換文字展開狀態
function toggleDescription(index: number) {
  if (expandedDescriptions.value.has(index)) {
    expandedDescriptions.value.delete(index);
  } else {
    expandedDescriptions.value.add(index);
  }
}

// 檢查文字是否需要展開功能
function needsExpansion(text: string): boolean {
  return text.length > 80; // 如果文字超過80個字符，就提供展開功能
}

// 輪播控制功能
function goToSlide(index: number) {
  currentIndex.value = index;
  // 切換圖片後重新開始計時
  restartAutoplay();
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % photos.value.length;
  // 切換圖片後重新開始計時
  restartAutoplay();
}

function prevSlide() {
  currentIndex.value = currentIndex.value === 0 ? photos.value.length - 1 : currentIndex.value - 1;
  // 切換圖片後重新開始計時
  restartAutoplay();
}

// 自動播放功能
function startAutoplay() {
  if (props.autoplayInterval > 0 && photos.value.length > 1) {
    intervalId.value = window.setInterval(() => {
      if (isAutoplay.value) {
        currentIndex.value = (currentIndex.value + 1) % photos.value.length;
      }
    }, props.autoplayInterval);
  }
}

function stopAutoplay() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

function restartAutoplay() {
  // 停止當前的自動播放
  stopAutoplay();
  // 重新開始自動播放（重新計算秒數）
  if (isAutoplay.value) {
    startAutoplay();
  }
}

function pauseAutoplay() {
  isAutoplay.value = false;
}

function resumeAutoplay() {
  isAutoplay.value = true;
  // 恢復時重新開始計時
  restartAutoplay();
}

// 初始化
onMounted(async () => {
  await loadLocaleMessages(locale.value);
  updatePhotos();
  startAutoplay();
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
  currentIndex.value = 0;
  stopAutoplay();
  startAutoplay();
}, { deep: true });

// 清理
watch(() => photos.value.length, (newLength) => {
  if (newLength === 0) {
    stopAutoplay();
  } else {
    stopAutoplay();
    startAutoplay();
  }
});
</script>

<template>
  <div class="art-gallery" 
       v-if="photos.length > 0"
       @mouseenter="pauseAutoplay" 
       @mouseleave="resumeAutoplay">
    <!-- 主要圖片展示區 -->
    <div class="gallery-main">
      
      <!-- 圖片容器 -->
      <div class="image-container">
        <div class="image-slide" 
             v-for="(photo, index) in photos" 
             :key="index"
             :class="{ active: index === currentIndex }"
             :style="{ transform: `translateX(${(index - currentIndex) * 100}%)` }">
          
          <!-- 圖片 -->
          <div class="image-wrapper">
            <img 
              :src="photo.image" 
              :alt="photo.description"
              @error="(e) => console.error('Image failed to load:', photo.image, e)"
              @load="() => console.log('Image loaded successfully:', photo.image)"
            />
          </div>
          
          <!-- 圖片描述區域 -->
          <div class="image-description-area" 
               :class="{ expanded: expandedDescriptions.has(index) }">
            <div class="description-content">
              <p class="image-description" 
                 :class="{ 
                   'can-expand': needsExpansion(photo.description),
                   'expanded': expandedDescriptions.has(index)
                 }">
                {{ photo.description }}
              </p>
              
              <!-- 展開/收起按鈕 -->
              <button v-if="needsExpansion(photo.description)" 
                      class="expand-btn"
                      @click="toggleDescription(index)"
                      :aria-label="expandedDescriptions.has(index) ? '收起' : '展開'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
                     :class="{ rotated: expandedDescriptions.has(index) }">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" 
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 導航箭頭 -->
      <button class="nav-arrow nav-prev" 
              @click="prevSlide" 
              v-if="photos.length > 1"
              :disabled="photos.length <= 1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button class="nav-arrow nav-next" 
              @click="nextSlide" 
              v-if="photos.length > 1"
              :disabled="photos.length <= 1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- 縮圖導航 -->
    <div class="gallery-thumbnails" v-if="showThumbnails && photos.length > 1">
      <button class="thumbnail" 
              v-for="(photo, index) in photos" 
              :key="`thumb-${index}`"
              :class="{ active: index === currentIndex }"
              @click="goToSlide(index)">
        <img :src="photo.image" :alt="photo.description" />
        <div class="thumbnail-overlay"></div>
      </button>
    </div>

    <!-- 指示器 -->
    <div class="gallery-indicators" v-if="!showThumbnails && photos.length > 1">
      <button class="indicator" 
              v-for="(_, index) in photos" 
              :key="`indicator-${index}`"
              :class="{ active: index === currentIndex }"
              @click="goToSlide(index)">
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 藝術風格變數
$white: #ffffff;
$black: #000000;
$text-dark: #333333;
$text-light: #666666;
$text-lighter: #999999;
$border-light: #f0f0f0;
$accent-gold: #c9a961;
$shadow-light: rgba(0, 0, 0, 0.08);
$shadow-medium: rgba(0, 0, 0, 0.15);
$shadow-dark: rgba(0, 0, 0, 0.25);

// 優雅的動畫
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// 主要輪播容器
.art-gallery {
  margin: 60px 0;
  background: $white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px $shadow-light;
  animation: fadeInUp 0.8s ease-out;

  @media (max-width: 768px) {
    margin: 40px 0;
    border-radius: 8px;
  }
}

// 主要展示區
.gallery-main {
  position: relative;
  background: $white;
  overflow: hidden;
  border-bottom: 1px solid $border-light;

  &:hover .nav-arrow {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

// 圖片容器
.image-container {
  position: relative;
  width: 100%;
  min-height: 450px; // 使用最小高度而不是固定高度
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 350px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
  }
}

// 圖片滑動項
.image-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); // 調慢動畫速度，使用更流暢的曲線
  opacity: 0;

  &.active {
    opacity: 1;
  }
}

// 圖片包裝器
.image-wrapper {
  position: relative;
  width: 100%;
  flex: 1; // 讓圖片區域佔用剩餘空間
  min-height: 300px; // 設定最小高度
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 250px;
  }

  @media (max-width: 480px) {
    min-height: 200px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1.0s ease-out; // 調慢圖片縮放動畫
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
}

// 圖片描述區域
.image-description-area {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  border-top: 1px solid $border-light;
  min-height: 60px;
  max-height: 150px;
  overflow: hidden;
  transition: max-height 0.3s ease;

  &.expanded {
    max-height: 250px; // 展開時的最大高度
  }

  // 裝飾線條
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, $accent-gold, transparent);
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    min-height: 50px;
    max-height: 120px;
    
    &.expanded {
      max-height: 200px;
    }
    
    &::before {
      width: 40px;
      top: 6px;
    }
  }

  @media (max-width: 480px) {
    min-height: 45px;
    max-height: 100px;
    
    &.expanded {
      max-height: 180px;
    }
    
    &::before {
      width: 30px;
      top: 5px;
    }
  }

  .description-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    height: 100%;

    @media (max-width: 768px) {
      padding: 12px 15px;
    }

    @media (max-width: 480px) {
      padding: 10px 12px;
    }
  }

  .image-description {
    margin: 0;
    color: $text-dark;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.3px;
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInText 0.6s ease-out 0.3s forwards;
    max-width: 90%;
    transition: all 0.3s ease;

    // 預設狀態：限制行數
    &.can-expand:not(.expanded) {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    // 展開狀態：顯示全部文字
    &.expanded {
      display: block;
      overflow: visible;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.4;
      
      &.can-expand:not(.expanded) {
        -webkit-line-clamp: 2;
        line-clamp: 2;
      }
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
      line-height: 1.3;
    }
  }

  // 展開按鈕
  .expand-btn {
    margin-top: 8px;
    border: none;
    background: transparent;
    color: $accent-gold;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.3s ease;
    opacity: 0;
    animation: fadeInText 0.6s ease-out 0.5s forwards;

    &:hover {
      background: rgba(201, 169, 97, 0.1);
      transform: scale(1.1);
    }

    svg {
      transition: transform 0.3s ease;
      
      &.rotated {
        transform: rotate(180deg);
      }
    }

    @media (max-width: 768px) {
      margin-top: 6px;
    }
  }
}

// 文字淡入動畫
@keyframes fadeInText {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 導航箭頭
.nav-arrow {
  position: absolute;
  top: 50%; // 回到圖片區域的中心位置
  transform: translateY(-50%) scale(0.9);
  width: 50px;
  height: 50px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: $text-dark;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px $shadow-medium;
  z-index: 10;

  &:hover {
    background: $white;
    color: $accent-gold;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 25px $shadow-dark;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: translateY(-50%) scale(0.8);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    opacity: 0.8;
  }
}

.nav-prev {
  left: 20px;

  @media (max-width: 768px) {
    left: 15px;
  }
}

.nav-next {
  right: 20px;

  @media (max-width: 768px) {
    right: 15px;
  }
}

// 縮圖導航
.gallery-thumbnails {
  display: flex;
  gap: 12px;
  padding: 20px;
  background: rgba(249, 249, 249, 0.8);
  backdrop-filter: blur(10px);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: $border-light transparent;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $border-light;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    gap: 8px;
  }
}

.thumbnail {
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border: none;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px $shadow-light;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px $shadow-medium;
  }

  &.active {
    box-shadow: 0 4px 15px $accent-gold;
    
    .thumbnail-overlay {
      opacity: 0;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 45px;
  }
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.3s ease;
}

// 指示器
.gallery-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: rgba(249, 249, 249, 0.8);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 15px;
    gap: 8px;
  }
}

.indicator {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: rgba(51, 51, 51, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(51, 51, 51, 0.6);
    transform: scale(1.2);
  }

  &.active {
    background: $accent-gold;
    transform: scale(1.3);
    box-shadow: 0 2px 8px rgba(201, 169, 97, 0.4);
  }

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
}

// 響應式設計
@media (max-width: 1024px) {
  .art-gallery {
    margin: 50px 0;
  }
}

@media (max-width: 768px) {
  .art-gallery {
    margin: 30px 0;
  }

  .image-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .art-gallery {
    border-radius: 6px;
  }

  .image-container {
    height: 250px;
  }

  .thumbnail {
    width: 50px;
    height: 38px;
  }
}
</style>
