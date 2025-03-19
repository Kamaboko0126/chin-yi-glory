<script setup lang="ts"></script>

<template>
  <header>
    <router-link class="item" to="/">首頁</router-link>
    <router-link class="item" to="/curationintro">策展總論</router-link>
    <router-link class="item" to="schoolintro">勤益簡介</router-link>
    <router-link class="item" to="/">創辦人簡介</router-link>
    <router-link class="item" to="/">張明王國秀基金會簡介</router-link>
    <router-link class="item" to="/">勤益風華-藝術家眼中的勤益校景</router-link>
  </header>
  <div class="block"></div>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  .item {
    padding: 15px 20px;
    color: #283149;
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
    font-family: "LXGW WenKai Mono TC", serif;
  }
}
.block {
  height: 51px;
  width: 100%;
}
</style>
