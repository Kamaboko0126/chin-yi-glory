<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { gsap } from "gsap";

const photog2_01 = new URL("../../assets/curation/05.jpg", import.meta.url)
  .href;
// const photog2_02 = new URL("../../assets/curation/06.jpg", import.meta.url).href;
const photog2_03 = new URL("../../assets/curation/07.jpg", import.meta.url)
  .href;
const photog2_04 = new URL("../../assets/curation/08.jpg", import.meta.url)
  .href;
const photog2_05 = new URL("../../assets/curation/09.jpg", import.meta.url)
  .href;

const next = () => {
  console.log("next");
  var tl = gsap.timeline({ delay: 1.5 });
  tl.to(".middle", {
    width: "15%",
    ease: "power2.out",
    duration: 1.5,
  });
  tl.to(
    ".right1",
    {
      width: "70%",
      ease: "power2.out",
      duration: 1.5,
    },
    "<"
  );
  tl.to(
    ".card-group2 .top",
    {
      transform: "translateX(-15%)",
      ease: "power2.out",
    },
    "<"
  );
  return tl;
};

const reset = () => {
  var tl = gsap.timeline({ delay: 1.5 });
  tl.to(".card-group2 .top", {
    transform: "translateX(0%)",
    ease: "power2.out",
    duration: 0,
  });
  tl.to(
    ".middle",
    {
      width: "70%",
      ease: "power2.out",
      duration: 0,
    },
    "<"
  );
  tl.to(
    ".right1",
    {
      width: "15%",
      ease: "power2.out",
      duration: 0,
    },
    "<"
  );
  return tl;
};

onMounted(() => {
  nextTick(() => {
    next().add(reset(), "+=3");
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
</script>

<template>
  <div class="card-group2">
    <div class="top">
      <div class="photo-item left">
        <img :src="photog2_01" alt="" />
      </div>
      <div class="photo-item middle">
        <img :src="photog2_05" alt="" />
      </div>
      <div class="photo-item right1">
        <img :src="photog2_03" alt="" />
      </div>
      <div class="photo-item right2">
        <img :src="photog2_04" alt="" />
      </div>
    </div>
    <div class="bottom">
      <div class="title"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-group2 {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  .top {
    display: flex;
    width: 100%;
    .photo-item {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &.left,
      &.right1,
      &.right2 {
        width: 15%;
        img {
          //   transform: scale(0.5);
        }
      }
      &.middle {
        width: 70%;
      }
      img {
        max-width: 100%;
        max-height: 40vh;
        object-fit: contain;
      }
    }
  }
}
</style>
