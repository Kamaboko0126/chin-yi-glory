<script setup lang="ts">
import HeaderItem from "./components/HeaderItem.vue";
</script>

<template>
  <main>
    <HeaderItem />
    <router-view></router-view>
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
