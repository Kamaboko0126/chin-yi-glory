<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { gsap } from "gsap";

const artwork = new URL("../../assets/artworks/01.jpg", import.meta.url).href;
const logo = new URL("../../assets/ncut_white.png", import.meta.url).href;

onMounted(() => {
  nextTick(() => {
    gsap.from(".left .logo", {
      duration: 2,
      opacity: 0,
      y: 100,
      ease: "power2.out",
    });
    gsap.from(".left .title", {
      duration: 2.2,
      opacity: 0,
      y: 100,
      ease: "power1.out",
    });
    gsap.from(".left .button", {
      duration: 2,
      opacity: 0,
      y: 100,
      ease: "power2.out",
    });
    gsap.to(".right .mask", {
      duration: 1,
      y: 800,
      ease: "power1.out",
    });
  });
});
</script>

<template>
  <section class="first">
    <div class="left">
      <div class="logo">
        <img :src="logo" />
        <div class="text">
          <h2>國立勤益科技大學</h2>
          <h2>文化創意事業系</h2>
        </div>
      </div>
      <div class="title">
        <h1>CHIN-YI</h1>
        <h1>GLORY</h1>
        <h1>勤益風華</h1>
      </div>
      <div class="button">
        <h2>Welcome !</h2>
      </div>
    </div>
    <div class="right">
      <div class="img" :style="{ backgroundImage: `url(${artwork})` }">
        <div class="mask"></div>
      </div>
    </div>
  </section>
  <section class="second">
    <div class="left">
      <h1>OUR</h1>
      <h1>CURATORIAL TEAM</h1>
      <h1>策展團隊</h1>
    </div>
    <div class="right">
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
.first {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .left {
    width: 50%;
    height: 100%;
    background-color: #161616;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 100px;
    .logo {
      height: 50px;
      display: flex;
      align-items: flex-end;
      position: absolute;
      left: 100px;
      top: 100px;
      img {
        width: 50px;
        height: 50px;
      }
      h2 {
        color: #fff;
        font-size: 18px;
        margin-left: 10px;
      }
    }
    .title {
      h1 {
        color: #af8cde;
        font-size: 7vw;
        line-height: 110%;
        font-family: "Oswald", sans-serif;
        letter-spacing: 3px;
        &:nth-child(3) {
          color: #fff;
          letter-spacing: 0px;
        }
      }
    }
    .button {
      font-size: 22px;
      color: #fff;
      background: #af8cde;
      position: absolute;
      left: 100px;
      bottom: 100px;
      font-family: "Oswald", sans-serif;
      padding: 0.1% 7%;
    }
  }
  .right {
    width: 50%;
    height: 100%;
    background-color: #af8cde;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 70px;
    .mask {
      width: 100%;
      height: 100%;
      background-color: #af8cde;
    }
    .img {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }
  }
}
.second {
  padding-top: 150px;
  background: #161616;
  width: 100%;
  display: flex;
  .left {
    width: 45%;
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    h1 {
      color: #fff;
      font-size: 4.5vw;
      line-height: 110%;
      font-family: "Oswald", sans-serif;
      letter-spacing: 3px;
      &:nth-child(3) {
        color: #af8cde;
        letter-spacing: 0px;
      }
    }
  }
  .right {
    padding: 100px;
    width: 55%;
    height: 100%;
    p {
      color: #fff;
      font-size: 22px;
      line-height: 175%;
      font-family: "LXGW WenKai Mono TC", serif;
    }
  }
}
footer{
    background: #af8cde;
    padding: 70px 40px;
    p{
        color: #fff;
        line-height: 200%;
        font-size: 16px;
        &:nth-child(2){
            margin-top: 20px;
        }
    }
    a{
        color: #fff;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
}
</style>
