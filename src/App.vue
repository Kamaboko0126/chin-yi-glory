<script setup lang="ts">
import SidebarNav from "./components/SidebarNav.vue";
import FooterItem from "./components/FooterItem.vue";
import ScrollTop from "primevue/scrolltop";
</script>

<template>
  <main>
    <SidebarNav />
    <div class="main-content">
      <router-view></router-view>
    </div>
    <ScrollTop />
    <FooterItem />
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Times New Roman", "LXGW WenKai Mono TC", serif;
}

main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 260px; // 側邊欄寬度
  
  @media (max-width: 768px) {
    margin-left: 0; // 移動端不需要左邊距
  }
}

p {
  color: #283149;
  font-size: 18px;
  line-height: 200%;
  @media (max-width: 1400px) {
    font-size: 18px;
    line-height: 200%;
  }
  @media (max-width: 1199px) {
    font-size: 18px;
    line-height: 200%;
  }
  @media (max-width: 767px) {
    font-size: 17px;
    line-height: 200%;
  }
  @media (max-width: 575px) {
    font-size: 15px;
    line-height: 200%;
  }
}

.title {
  color: #283149;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  @media (max-width: 1400px) {
    font-size: 18px;
  }
  @media (max-width: 1199px) {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 17px;
  }
  @media (max-width: 575px) {
    font-size: 13px;
    // display: -webkit-box; /* 必須使用這個屬性 */
    // -webkit-box-orient: vertical; /* 垂直方向排列 */
    // -webkit-line-clamp: 1; /* 顯示的行數 */
    // overflow: hidden; /* 隱藏超出部分 */
    // text-overflow: ellipsis; /* 顯示省略號 */
  }
}

.section-title {
  padding: 0 0 15px 0;
  font-size: 24px;
  font-weight: 600;
  color: #283149;
  @media (max-width: 1400px) {
    font-size: 23px;
  }
  @media (max-width: 1199px) {
    font-size: 21px;
  }
  @media (max-width: 767px) {
    font-size: 19px;
  }
  @media (max-width: 575px) {
    font-size: 17px;
  }
}
</style>
