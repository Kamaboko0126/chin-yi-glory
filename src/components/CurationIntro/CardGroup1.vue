<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref } from "vue";
// import { gsap } from "gsap";

const photog1_01 = new URL("../../assets/curation/02.jpg", import.meta.url)
  .href;
const photog1_02 = new URL("../../assets/curation/03.jpg", import.meta.url)
  .href;
const photog1_03 = new URL("../../assets/curation/04.jpg", import.meta.url)
  .href;

const g1PhotoTitleMap = {
  [photog1_01]: "位於青永館前草皮的電機工程館。",
  [photog1_02]: "921夷平後樣貌。",
  [photog1_03]:
    "教學大樓在私校時代，每到夜間廊道欄牆上擺放一個又一個的大茶桶供夜間上課同學取用，是張明將軍與王國秀創辦人給夜間辛苦進修同學的關懷。",
};

const g1Photos = [photog1_01, photog1_02, photog1_03];
const g1CurrentPhoto = ref(photog1_01);
const g1CurrentTitle = ref(g1PhotoTitleMap[g1CurrentPhoto.value]);
let intervalId: ReturnType<typeof setInterval> | null = null;

// 當 currentPhoto 改變時，動態更新 currentText
const updateCurrentText = (photo: string) => {
  stopAutoSlide();
  g1CurrentPhoto.value = photo;
  g1CurrentTitle.value = g1PhotoTitleMap[photo];
};

// 啟動自動輪播
const startAutoSlide = () => {
  let currentIndex = g1Photos.indexOf(g1CurrentPhoto.value);
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % g1Photos.length;
    stopAutoSlide();
    g1CurrentPhoto.value = g1Photos[currentIndex];
    g1CurrentTitle.value = g1PhotoTitleMap[g1Photos[currentIndex]];
    resetAutoSlide(); // 使用者點選後重新計秒
  }, 3500); // 每隔3秒切換
};

// 停止自動輪播
const stopAutoSlide = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// 重置自動輪播
const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

onMounted(() => {
  nextTick(() => {
    startAutoSlide();
    // var tl = gsap.timeline({});
    // tl.to(
    //   ".card3 p",
    //   {
    //     display: "block",
    //     ease: "power2.out",
    //   },
    //   "<"
    // );
  });
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <div class="card-group1">
    <div class="top">
      <div class="group-list">
        <div
          class="item"
          @mouseenter="stopAutoSlide"
          @mouseleave="resetAutoSlide"
        >
          <img
            :src="photog1_01"
            @mouseenter="updateCurrentText(photog1_01)"
            :style="{ width: g1CurrentPhoto == photog1_01 ? '100%' : '90%' }"
          />
        </div>
        <div
          class="item"
          @mouseenter="stopAutoSlide"
          @mouseleave="resetAutoSlide"
        >
          <img
            :src="photog1_02"
            @mouseenter="updateCurrentText(photog1_02)"
            :style="{ width: g1CurrentPhoto == photog1_02 ? '100%' : '90%' }"
          />
        </div>
        <div
          class="item"
          @mouseenter="stopAutoSlide"
          @mouseleave="resetAutoSlide"
        >
          <img
            :src="photog1_03"
            @mouseenter="updateCurrentText(photog1_03)"
            :style="{ width: g1CurrentPhoto == photog1_03 ? '100%' : '90%' }"
          />
        </div>
      </div>
      <div class="photo">
        <img :src="g1CurrentPhoto" />
      </div>
    </div>
    <div class="bottom">
      <div class="title">圖說：{{ g1CurrentTitle }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-group1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 15px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .group-list {
      width: 18%;
      display: flex;
      flex-direction: column;
      .item {
        width: 90%;
        margin-top: 15px;
        cursor: pointer;
      }
    }
    .photo {
      width: 80%;
      img {
        width: 100%;
      }
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .title {
      width: 79%;
      font-family: "LXGW WenKai Mono TC", serif;
    }
  }
}
</style>
