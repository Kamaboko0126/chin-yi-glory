<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { gsap } from "gsap";

const artwork = new URL("../../assets/artworks/02.jpg", import.meta.url).href;
const logo = new URL("../../assets/ncut.png", import.meta.url).href;

onMounted(() => {
  nextTick(() => {
    var tl = gsap.timeline();
    tl.from(".first .background", {
      duration: 2,
      opacity: 0,
      scale: 4,
      ease: "power2.out",
    });
    tl.from(".first .logo", {
      duration: 2,
      opacity: 0,
      ease: "power2.out",
    });
    tl.from(".first .text", {
      duration: 2,
      opacity: 0,
      ease: "power2.out",
    },"<");
  });
});
</script>

<template>
  <!-- <header>
    <div class="item">策展總論</div>
    <div class="item">勤益簡介</div>
    <div class="item">創辦人簡介</div>
    <div class="item">張明王國秀基金會簡介</div>
    <div class="item">勤益風華-藝術家眼中的勤益校景</div>
  </header> -->
  <section class="first">
    <div class="content">
      <div class="background" :style="{ backgroundImage: `url(${artwork})` }">
        <div class="logo">
          <img :src="logo" />
          <h2>國立勤益科技大學</h2>
        </div>
        <div class="text">
          <p>策　　展：游惠遠</p>
          <p>撰　　研：游惠遠 翁瑄孺</p>
          <p>藝術家　：呂金龍 吳清川 施世昱(依姓氏筆劃排列)</p>
          <p>英　　譯：林珞帆 翁瑄孺</p>
          <p>歷史照片：陳碧貞 蘇啟昌 游惠遠</p>
          <p>校園攝影：黃昶承</p>
          <p>插　　圖：宮浣芯</p>
          <p>網頁設計：吳彥呈</p>
          <p>展覽日期：2025 年4 月1 日-2030 年12 月31 日</p>
          <p>展覽地點：張明王國秀文教基金會</p>
          <p>製作單位：文化創意事業系</p>
          <p>主辦單位：張明王國秀文教基金會</p>
        </div>
      </div>
    </div>
  </section>
  <footer>
    <p>
      ※重要公告：本網頁資源屬於全球勤益人的公共文化財，歡迎免費利用。如果需要藝術家校景彩繪高階圖檔製作紀念品，請逕洽張明王國
      秀基金會。請尊重著作權，註明作品出處，並將完稿設計品寄送一份回傳給張明王國秀基金會存檔。
    </p>
    <p>
      ※其他本校老照片連結：<a
        href="https://chinyihalloffame.blogspot.com/p/blog-page_7.html"
        >https://chinyihalloffame.blogspot.com/p/blog-page_7.html</a
      >(需使用請取得授權)
    </p>
  </footer>
</template>

<style scoped lang="scss">
header {
  top: 0;
  right: 0;
  position: fixed;
  z-index: 1;
  display: flex;
}
.first {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .background {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
    }
  }
  .logo {
    position: absolute;
    left: 100px;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    h2{
      margin-left: 14px;
      color: #161616;
      font-size: 30px;
      font-weight: 700;
      font-family: "LXGW WenKai Mono TC", serif;
      transform: translateY(2px);
    }
  }
  .text {
    position: absolute;
    right: 100px;
    top: 50px;
    p {
      color: #161616;
      font-family: "LXGW WenKai Mono TC", serif;
      font-size: 20px;
      font-weight: 500;
      line-height: 150%;
    }
  }
}
footer {
  background: #161616;
  padding: 70px 40px;
  p {
    color: #fff;
    line-height: 200%;
    font-size: 16px;
    &:nth-child(2) {
      margin-top: 20px;
    }
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
