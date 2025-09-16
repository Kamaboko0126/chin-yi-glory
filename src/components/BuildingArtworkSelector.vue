<script setup lang="ts">
import { ref, watch, onMounted } from 'vue' // 移除未使用的 computed
import { useI18n } from 'vue-i18n'

interface Artwork {
  id: number
  title: string
  artist: string
  year: string
  description: string[]
  location: number
}

interface Props {
  isVisible: boolean
  buildingLocation: string | number
}

interface Emits {
  close: []
  select: [artworkId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { locale } = useI18n()

const artworks = ref<Artwork[]>([])
const isLoading = ref(false)

// 圖片錯誤處理函數
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = '/artworks/placeholder.svg'
  }
}

// 獲取建築物名稱
const getBuildingName = (location: string | number) => {
  const locationNum = Number(location)
  
  const mapChineseList = [
    "勤益學舍",
    "工業工程與管理館", 
    "青永館",
    "文化休閒館",
    "明秀湖",
    "工程館",
    "工具機學院大樓",
    "機車停車場",
    "行政大樓後方房舍",
    "行政大樓",
    "圖書資訊館",
    "運動場",
    "機械館",
    "誠樸館",
    "創新研發大樓",
    "國秀樓",
    "管理館",
    "勤創基地",
    "創辦人故居",
    "其他"
  ]
  
  const mapEnglishList = [
    "Qin-Yi Dormitory",
    "Industrial Engineering and Management Building",
    "Qing-Yong Building",
    "Culture and Recreation Building",
    "Ming-Xiu Lake",
    "Engineering Building",
    "Machine Tool Institute Building",
    "Motorcycle Parking Lot",
    "Administrative Building Rear Housing",
    "Administrative Building",
    "Library and Information Building",
    "Sports Field",
    "Mechanical Building",
    "Cheng-Pu Building",
    "Innovation and R&D Building",
    "Guo-Xiu Building",
    "Management Building",
    "Qin-Chuang Base",
    "Founder's Former Residence",
    "Others"
  ]
  
  const currentMapList = locale.value === "zh" ? mapChineseList : mapEnglishList
  return currentMapList[locationNum - 1] || `${locale.value === "zh" ? "建築物" : "Building"} ${location}`
}

// 獲取作品圖片
const getArtworkImage = (id: number) => {
  const paddedId = String(id).padStart(2, '0')
  return `/artworks/${paddedId}.webp`
}

// 載入該建築物的所有作品
const fetchBuildingArtworks = async (buildingLocation: string | number) => {
  if (!buildingLocation) return
  
  isLoading.value = true
  try {
    const locationPath = locale.value === 'zh' ? '/locales/zh/artworksIntro.json' : '/locales/en/artworksIntro.json'
    const response = await fetch(locationPath)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: Artwork[] = await response.json()
    
    // 篩選出指定建築物的作品
    const locationNum = Number(buildingLocation)
    artworks.value = data.filter(artwork => artwork.location === locationNum)
    
    console.log(`載入建築物 ${buildingLocation} 的作品:`, artworks.value)
  } catch (error) {
    console.error('載入作品資料失敗:', error)
    artworks.value = []
  } finally {
    isLoading.value = false
  }
}

// 處理作品選擇
const selectArtwork = (artworkId: number) => {
  emit('select', String(artworkId))
}

// 關閉選擇器
const closeSelector = () => {
  emit('close')
}

// 監聽 props 變化
watch(
  () => props.buildingLocation,
  (newLocation) => {
    if (newLocation && props.isVisible) {
      fetchBuildingArtworks(newLocation)
    }
  },
  { immediate: true }
)

watch(
  () => props.isVisible,
  (isVisible) => {
    if (isVisible && props.buildingLocation) {
      fetchBuildingArtworks(props.buildingLocation)
    }
  }
)

// 組件掛載時載入資料
onMounted(() => {
  if (props.isVisible && props.buildingLocation) {
    fetchBuildingArtworks(props.buildingLocation)
  }
})
</script>

<template>
  <div v-if="isVisible" class="building-artwork-selector">
    <div class="modal-backdrop" @click="closeSelector" />
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">
          {{ getBuildingName(buildingLocation) }}
          <span class="artwork-count">
            ({{ locale === 'zh' ? '共' : 'Total' }} {{ artworks.length }} {{ locale === 'zh' ? '件作品' : 'artworks' }})
          </span>
        </h2>
        <button class="close-btn" @click="closeSelector">×</button>
      </div>
      
      <div class="modal-content">
        <!-- 載入中狀態 -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>{{ locale === 'zh' ? '載入中...' : 'Loading...' }}</p>
        </div>
        
        <!-- 沒有作品時 -->
        <div v-else-if="artworks.length === 0" class="empty-state">
          <p>{{ locale === 'zh' ? '此建築物暫無相關作品' : 'No artworks found for this building' }}</p>
        </div>
        
        <!-- 作品列表 -->
        <div v-else class="artwork-grid">
          <div
            v-for="artwork in artworks"
            :key="artwork.id"
            class="artwork-card"
            @click="selectArtwork(artwork.id)"
          >
            <div class="artwork-image-container">
              <img 
                :src="getArtworkImage(artwork.id)"
                :alt="artwork.title"
                class="artwork-image"
                loading="lazy"
                @error="handleImageError"
              />
              <div class="artwork-overlay">
                <span class="view-text">
                  {{ locale === 'zh' ? '查看詳情' : 'View Details' }}
                </span>
              </div>
            </div>
            <div class="artwork-info">
              <h3 class="artwork-title">{{ artwork.title }}</h3>
              <p class="artwork-artist">{{ artwork.artist }}</p>
              <p class="artwork-year">{{ artwork.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.building-artwork-selector {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
  }

  .modal-container {
    position: relative;
    background: white;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    max-width: 90vw;
    max-height: 90vh;
    width: 1000px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 28px;
      border-bottom: 1px solid #e5e7eb;
      background: #f9fafb;

      .modal-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #111827;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;

        .artwork-count {
          font-size: 1rem;
          font-weight: 400;
          color: #6b7280;
        }
      }

      .close-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: #f3f4f6;
        color: #6b7280;
        font-size: 20px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;

        &:hover {
          background: #e5e7eb;
          color: #374151;
        }
      }
    }

    .modal-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px 28px;

      .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: #6b7280;

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f4f6;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        p {
          font-size: 1rem;
          margin: 0;
        }
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #6b7280;
        font-size: 1.1rem;

        p {
          margin: 0;
        }
      }

      .artwork-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;

        .artwork-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
            border-color: #d1d5db;

            .artwork-overlay {
              opacity: 1;
            }
          }

          .artwork-image-container {
            position: relative;
            width: 100%;
            height: 150px;
            overflow: hidden;

            .artwork-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s ease;
            }

            .artwork-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.6);
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              transition: opacity 0.3s ease;

              .view-text {
                color: white;
                font-size: 0.9rem;
                font-weight: 500;
                padding: 8px 16px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                backdrop-filter: blur(4px);
              }
            }
          }

          .artwork-info {
            padding: 16px;

            .artwork-title {
              font-size: 1rem;
              font-weight: 600;
              color: #111827;
              margin: 0 0 4px 0;
              line-height: 1.3;
            }

            .artwork-artist {
              font-size: 0.875rem;
              color: #6b7280;
              margin: 0 0 2px 0;
              line-height: 1.4;
            }

            .artwork-year {
              font-size: 0.75rem;
              color: #9ca3af;
              margin: 0;
              line-height: 1.4;
            }
          }
        }
      }
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  // 響應式設計
  @media (max-width: 768px) {
    padding: 10px;

    .modal-container {
      width: 100%;
      max-height: 95vh;

      .modal-header {
        padding: 20px;

        .modal-title {
          font-size: 1.25rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;

          .artwork-count {
            font-size: 0.875rem;
          }
        }
      }

      .modal-content {
        padding: 20px;

        .artwork-grid {
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;

          .artwork-card {
            .artwork-image-container {
              height: 120px;
            }

            .artwork-info {
              padding: 12px;

              .artwork-title {
                font-size: 0.9rem;
              }

              .artwork-artist {
                font-size: 0.8rem;
              }

              .artwork-year {
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .modal-container {
      .modal-content {
        .artwork-grid {
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;

          .artwork-card {
            .artwork-image-container {
              height: 100px;
            }

            .artwork-info {
              padding: 10px;

              .artwork-title {
                font-size: 0.85rem;
              }

              .artwork-artist {
                font-size: 0.75rem;
              }

              .artwork-year {
                font-size: 0.65rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>