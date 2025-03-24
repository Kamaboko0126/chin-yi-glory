<script setup lang="ts">
import HeaderItem from "./components/HeaderItem.vue";
import FooterItem from "./components/FooterItem.vue";
import ScrollTop from "primevue/scrolltop";
</script>

<template>
  <main>
    <HeaderItem />
    <router-view></router-view>
    <ScrollTop />
    <FooterItem />
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "LXGW WenKai Mono TC", serif;
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
    font-size: 15px;
    // display: -webkit-box; /* 必須使用這個屬性 */
    // -webkit-box-orient: vertical; /* 垂直方向排列 */
    // -webkit-line-clamp: 1; /* 顯示的行數 */
    // overflow: hidden; /* 隱藏超出部分 */
    // text-overflow: ellipsis; /* 顯示省略號 */
  }
}

.section-title{
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
