<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

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
];

// 根據當前語言選擇對應的列表
const currentMapList = computed(() => {
  return locale.value === "zh" ? mapChineseList : mapEnglishList;
});

// 載入關鍵點數據
const loadKeypoints = async () => {
  try {
    const response = await fetch("/location.json");
    const data = await response.json();

    if (data.length > 0 && data[0].annotations && data[0].annotations[0]) {
      const annotations = data[0].annotations[0].result;
      keypoints.value = annotations.map((annotation: any) => ({
        id: annotation.id,
        x: annotation.value.x,
        y: annotation.value.y,
        label: annotation.value.keypointlabels[0],
      }));
    }
  } catch (error) {
    console.error("載入關鍵點數據失敗:", error);
  }
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
  const index = parseInt(label) - 1;
  return currentMapList.value[index] || label;
};

onMounted(() => {
  loadKeypoints();
});
</script>

<template>
  <div class="map-item">
    <!-- 地圖容器 -->
    <div class="map-container">
      <img src="/map.png" alt="Campus Map" class="map-image" />

      <!-- 關鍵點標記 -->
      <div
        v-for="point in keypoints"
        :key="point.id"
        class="keypoint"
        :style="getKeypointStyle(point)"
        :title="getKeypointTitle(point.label)"
      >
        {{ point.label }}
      </div>
    </div>

    <!-- 地圖說明列表 -->
    <div class="map-legend">
      <h3 class="legend-title">
        {{ locale === "zh" ? "校園地圖說明" : "Campus Map Legend" }}
      </h3>
      <div class="legend-grid">
        <div
          v-for="(item, index) in currentMapList"
          :key="index"
          class="legend-item"
        >
          {{ item }}
        </div>
      </div>
    </div>
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

  .map-image {
    width: 90%;
    height: auto;
    border-radius: 6px;
    margin-bottom: 30px;
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
      width: 30px;
      height: 20px;
      border: 2px solid #5659a5;
      border-radius: 40%;
      transform: translate(-70%, -80%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: bold;
      color: #5659a5;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      z-index: 10;

      &:hover {
        width: 32px;
        height: 22px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        z-index: 20;
      }
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
    padding: 10px;
    margin: 10px auto;

    .map-container {
      width: 95%;
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
