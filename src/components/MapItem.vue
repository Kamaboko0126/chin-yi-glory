<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ArtworkModal from "./ArtworkModal.vue";
import ArtworkSelector from "./ArtworkSelector.vue";
import BuildingArtworkSelector from "./BuildingArtworkSelector.vue";

const { locale } = useI18n();

// 地圖類型
type MapType = "building" | "artwork";
const currentMapType = ref<MapType>("building");

// 彈窗狀態
const showArtworkModal = ref(false);
const showArtworkSelector = ref(false);
const showBuildingArtworkSelector = ref(false);
const selectedArtworkId = ref<string>("");
const selectedArtworkIds = ref<string>("");
const selectedBuildingLocation = ref<string>("");

// 關鍵點數據
const keypoints = ref<
  Array<{
    id: string;
    x: number;
    y: number;
    label: string;
  }>
>([]);

const mapChineseList = [
  "1.勤益學舍",
  "2.工業工程與管理館",
  "3.青永館",
  "4.文化休閒館",
  "5.明秀湖",
  "6.工程館",
  "7.工具機學院大樓",
  "8.機車停車場",
  "9.行政大樓後方房舍",
  "10.行政大樓",
  "11.圖書資訊館",
  "12.運動場",
  "13.機械館",
  "14.誠樸館",
  "15.創新研發大樓",
  "16.國秀樓",
  "17.管理館",
  "18.勤創基地",
  "19.創辦人故居",
  "20.其他",
];

const mapEnglishList = [
  "1.Qin-Yi Dormitory",
  "2.Industrial Engineering and Management Building",
  "3.Qing-Yong Building",
  "4.Culture and Recreation Building",
  "5.Ming-Xiu Lake",
  "6.Engineering Building",
  "7.Machine Tool Institute Building",
  "8.Motorcycle Parking Lot",
  "9.Administrative Building Rear Housing",
  "10.Administrative Building",
  "11.Library and Information Building",
  "12.Sports Field",
  "13.Mechanical Building",
  "14.Cheng-Pu Building",
  "15.Innovation and R&D Building",
  "16.Guo-Xiu Building",
  "17.Management Building",
  "18.Qin-Chuang Base",
  "19.Founder's Former Residence",
  "20.Others",
];

// 根據當前語言選擇對應的列表
const currentMapList = computed(() => {
  return locale.value === "zh" ? mapChineseList : mapEnglishList;
});

// 載入關鍵點數據
const loadKeypoints = async (mapType: MapType = currentMapType.value) => {
  try {
    const fileName =
      mapType === "building"
        ? "/buildingLocation.json"
        : "/artworkLocation.json";
    const response = await fetch(fileName);
    const data = await response.json();

    keypoints.value = data.map((item: any, index: number) => ({
      id: `point-${index}`,
      x: item.x,
      y: item.y,
      label: item.keypointlabels[0],
    }));
    console.log(`載入的${mapType}關鍵點數據:`, keypoints.value);
  } catch (error) {
    console.error("載入關鍵點數據失敗:", error);
  }
};

// 切換地圖類型
const switchMapType = async (type: MapType) => {
  currentMapType.value = type;
  await loadKeypoints(type);
};

// 獲取關鍵點樣式
const getKeypointStyle = (point: { x: number; y: number }) => {
  return {
    left: `${point.x}%`,
    top: `${point.y}%`,
  };
};

// 獲取關鍵點標題
const getKeypointTitle = (label: string) => {
  // 處理複合標籤，如 "9&10", "22&23" 等
  if (label.includes("&")) {
    const numbers = label.split("&");
    const titles = numbers.map((num) => {
      const index = parseInt(num.trim()) - 1;
      return currentMapList.value[index]?.replace(/^\d+\./, "") || num;
    });
    return titles.join(" & ");
  } else {
    const index = parseInt(label) - 1;
    return currentMapList.value[index]?.replace(/^\d+\./, "") || label;
  }
};

// 處理建築物圖例點擊
const handleBuildingLegendClick = (buildingNumber: number) => {
  selectedBuildingLocation.value = String(buildingNumber);
  showBuildingArtworkSelector.value = true;
};

// 處理關鍵點點擊事件
const handleKeypointClick = (point: {
  id: string;
  x: number;
  y: number;
  label: string;
}) => {
  if (currentMapType.value === "artwork") {
    // 確保標籤是字符串類型
    const label = String(point.label);

    // 如果是作品模式，檢查是否為複合標籤
    if (label.includes("&")) {
      // 多個作品，顯示選擇器
      selectedArtworkIds.value = label;
      showArtworkSelector.value = true;
    } else {
      // 單個作品，直接顯示作品彈窗
      selectedArtworkId.value = label;
      showArtworkModal.value = true;
    }
  } else {
    // 如果是建築物模式，顯示該建築物的作品選擇器
    selectedBuildingLocation.value = String(point.label);
    showBuildingArtworkSelector.value = true;
  }
};

// 處理作品選擇
const handleArtworkSelect = (artworkId: string) => {
  showArtworkSelector.value = false;
  selectedArtworkId.value = String(artworkId);
  showArtworkModal.value = true;
};

// 關閉彈窗
const closeArtworkModal = () => {
  showArtworkModal.value = false;
  selectedArtworkId.value = "";
};

// 關閉選擇器
const closeArtworkSelector = () => {
  showArtworkSelector.value = false;
  selectedArtworkIds.value = "";
};

// 關閉建築物作品選擇器
const closeBuildingArtworkSelector = () => {
  showBuildingArtworkSelector.value = false;
  selectedBuildingLocation.value = "";
};

onMounted(() => {
  loadKeypoints();
});
</script>

<template>
  <div class="map-item">
    <!-- 地圖類型切換按鈕 -->
    <div class="map-toggle">
      <button
        :class="['toggle-btn', { active: currentMapType === 'building' }]"
        @click="switchMapType('building')"
      >
        {{ locale === "zh" ? "地圖探索" : "Campus Map" }}
      </button>
      <button
        :class="['toggle-btn', { active: currentMapType === 'artwork' }]"
        @click="switchMapType('artwork')"
      >
        {{ locale === "zh" ? "藝術家眼中的校景" : "Campus Artworks" }}
      </button>
    </div>

    <!-- 地圖容器 -->
    <div class="map-container">
      <img src="/map.webp" alt="Campus Map" class="map-image" />

      <!-- 關鍵點標記 -->
      <div
        v-for="point in keypoints"
        :key="point.id"
        class="keypoint"
        :class="
          currentMapType === 'building' ? 'building-point' : 'artwork-point'
        "
        :style="getKeypointStyle(point)"
        :title="getKeypointTitle(point.label)"
        @click="handleKeypointClick(point)"
      >
        <!-- 建築物顯示數字 -->
        <span v-if="currentMapType === 'building'" class="point-number">
          {{ point.label }}
        </span>
      </div>
    </div>

    <!-- 地圖說明列表 (只在建築物模式下顯示) -->
    <div v-if="currentMapType === 'building'" class="map-legend">
      <h3 class="legend-title">
        {{ locale === "zh" ? "校園地圖說明" : "Campus Map Legend" }}
      </h3>
      <div class="legend-grid">
        <div
          v-for="(item, index) in currentMapList"
          :key="index"
          class="legend-item clickable"
          @click="handleBuildingLegendClick(index + 1)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <!-- 建築物作品選擇器 -->
    <BuildingArtworkSelector
      :isVisible="showBuildingArtworkSelector"
      :buildingLocation="selectedBuildingLocation"
      @close="closeBuildingArtworkSelector"
      @select="handleArtworkSelect"
    />

    <!-- 作品選擇器 -->
    <ArtworkSelector
      :isVisible="showArtworkSelector"
      :artworkIds="selectedArtworkIds"
      @close="closeArtworkSelector"
      @select="handleArtworkSelect"
    />

    <!-- 作品彈窗 -->
    <ArtworkModal
      :isVisible="showArtworkModal"
      :artworkId="selectedArtworkId"
      @close="closeArtworkModal"
    />
  </div>
</template>

<style scoped lang="scss">
.map-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 100%;
  .map-toggle {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;

    .toggle-btn {
      padding: 10px 20px;
      border: 1px solid #e0e0e0;
      background: white;
      color: #666;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      transition: all 0.2s ease;
      @media (max-width: 768px) {
        font-size: 12px;
        padding: 5px 10px;
      }

      &:hover {
        border-color: #999;
        background: #f8f8f8;
        color: #333;
      }

      &.active {
        background: #333;
        color: white;
        border-color: #333;
      }
    }
  }

  .map-image {
    width: 90%;
    height: auto;
    border-radius: 6px;
    margin-bottom: 30px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .map-container {
    position: relative;
    display: inline-block;
    width: 90%;
    margin-bottom: 30px;

    .map-image {
      width: 100%;
      height: auto;
      border-radius: 6px;
      margin-bottom: 0;
    }

    .keypoint {
      position: absolute;
      border-radius: 50%;
      transform: translate(-70%, -80%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      transition: all 0.3s ease;
      z-index: 10;

      // 添加脈衝動畫效果
      &::before {
        content: "";
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border-radius: 50%;
        background: rgba(86, 89, 165, 0.3);
        animation: pulse 5s infinite;
        z-index: -1;
      }

      &.building-point {
        border: 2px solid #5659a5;
        background: white;
        color: #5659a5;
        width: 20px;
        height: 20px;
        .point-number {
          font-size: 10px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          width: 16px;
          height: 16px;
          .point-number {
            font-size: 8px;
          }
        }

        &::before {
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
        }
      }

      &.artwork-point {
        border: 2px solid #5659a5;
        background: #5659a5;
        width: 14px;
        height: 14px;

        @media screen and (max-width: 768px) {
          width: 8px;
          height: 8px;
        }
      }

      &:hover {
        width: 18px;
        height: 18px;
        z-index: 20;
        transform: translate(-70%, -80%) scale(1.1);

        &.building-point {
          width: 22px;
          height: 22px;
        }

        &::before {
          opacity: 0.5;
        }
      }
    }
  }

  // 脈衝動畫關鍵幀
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.3;
    }
    100% {
      transform: scale(1.6);
      opacity: 0;
    }
  }

  .map-legend {
    width: 100%;
    max-width: 800px;

    .legend-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: #222;
      margin-bottom: 20px;
      text-align: center;
      border-bottom: 2px solid #ddd;
      padding-bottom: 10px;
    }

    .legend-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(5, auto);
      grid-auto-flow: column;
      gap: 8px 16px;
      padding: 0 20px;
      max-width: 800px;
      margin: 0 auto;

      .legend-item {
        padding: 12px 16px;
        background: #fafafa;
        border-radius: 4px;
        font-size: 1rem;
        color: #333;
        border-left: 2px solid #ccc;
        transition: all 0.2s ease;
        text-align: left;

        &:hover {
          background: #f0f0f0;
          border-left-color: #666;
        }

        &.clickable {
          cursor: pointer;

          &:hover {
            background: #e8f4f8;
            border-left-color: #5659a5;
            color: #5659a5;
            transform: translateX(2px);
          }

          &:active {
            transform: translateX(1px);
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .map-legend {
      .legend-grid {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(7, auto);
        max-width: 700px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px auto;

    .map-container {
      width: 90%;
      margin-bottom: 25px;

      .keypoint {
        width: 24px;
        height: 18px;
        font-size: 12px;

        &:hover {
          width: 26px;
          height: 20px;
        }
      }
    }

    .map-legend {
      .legend-title {
        font-size: 1.3rem;
        margin-bottom: 15px;
      }

      .legend-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(10, auto);
        padding: 0 15px;
        gap: 6px 12px;
        max-width: 500px;

        .legend-item {
          font-size: 0.95rem;
          padding: 10px 14px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0;
    margin: 10px auto;

    .map-container {
      width: 100%;
      margin-bottom: 20px;

      .keypoint {
        width: 16px;
        height: 16px;
        font-size: 8px;

        &:hover {
          width: 20px;
          height: 20px;
        }

        &::after {
          font-size: 10px;
          padding: 2px 4px;
        }
      }
    }

    .map-legend {
      .legend-title {
        font-size: 1.2rem;
      }

      .legend-grid {
        grid-template-columns: 1fr;
        grid-template-rows: none;
        grid-auto-flow: row;
        padding: 0 10px;
        gap: 6px;
        max-width: 100%;

        .legend-item {
          font-size: 0.9rem;
          padding: 8px 12px;
        }
      }
    }
  }
}
</style>
