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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "LXGW WenKai Mono TC", serif;
}
</style>
