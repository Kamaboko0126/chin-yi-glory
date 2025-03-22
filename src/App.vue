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
</style>
