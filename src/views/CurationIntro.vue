<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
import { gsap } from "gsap";

const banner = new URL("../assets/curation/01.jpg", import.meta.url).href;
const photo1 = new URL("../assets/curation/02.jpg", import.meta.url).href;
const photo2 = new URL("../assets/curation/03.jpg", import.meta.url).href;
const photo3 = new URL("../assets/curation/04.jpg", import.meta.url).href;


const photoTitleMap = {
  [photo1]: "位於青永館前草皮的電機工程館。",
  [photo2]: "921夷平後樣貌。",
  [photo3]: "教學大樓在私校時代，每到夜間廊道欄牆上擺放一個又一個的大茶桶供夜間上課同學取用，是張明將軍與王國秀創辦人給夜間辛苦進修同學的關懷。",
};

const currentPhoto = ref(photo1);
const currentTitle = ref(photoTitleMap[currentPhoto.value]);

// 當 currentPhoto 改變時，動態更新 currentText
const updateCurrentText = (photo: string) => {
  currentPhoto.value = photo;
  currentTitle.value = photoTitleMap[photo];
};

onMounted(() => {
  nextTick(() => {
    var tl = gsap.timeline({});
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
  <section>
    <div class="container">
      <img :src="banner" alt="" />
      <div class="text">
        <p>
          　　策劃這個線上展覽的意義在於：當勤益百年，我輩早已煙沒於歷史洪流！但，青山依舊在，明秀湖仍清麗相伴。
        </p>
        <p>
          　　2025除夕前後，陸陸續續發生或大或小的地震，驚恐的程度總讓人聯想到1999年的｢九二一大地震」。這場地變，勤益受創嚴重，當時的電機大樓直接夷平、教學大樓與學生宿舍就此消失……。幸運的是，仍有幾座老建築活了下來！
        </p>
      </div>

      <div class="card-group1">
        <div class="top">
          <div class="group-list">
            <div class="item">
              <img
                :src="photo1"
                @click="updateCurrentText(photo1)"
                :style="{ width: currentPhoto == photo1 ? '100%' : '90%' }"
              />
            </div>
            <div class="item">
              <img
                :src="photo2"
                @click="updateCurrentText(photo2)"
                :style="{ width: currentPhoto == photo2 ? '100%' : '90%' }"
              />
            </div>
            <div class="item">
              <img
                :src="photo3"
                @click="updateCurrentText(photo3)"
                :style="{ width: currentPhoto == photo3 ? '100%' : '90%' }"
              />
            </div>
          </div>
          <div class="photo">
            <img :src="currentPhoto" />
          </div>
        </div>
        <div class="bottom">
          <div class="title">圖說：{{ currentTitle }}</div>
        </div>
      </div>

      <div class="text">
        <p>
          　　大學者，除了有大師，還應有老樹老屋，方足以印證傳承軌跡。但，面對大造化，我輩不得不謙卑。滄海能成桑田，何況一小小樓房？不得已，只能以紙筆描繪以留後人緬懷。
        </p>
        <p>
          　　這是一個始於2013終於2024的勤益校景十年彩繪計畫，最後將61幅作品移交｢張明王國秀基金會」永久典藏。此期間，等待了13年的｢勤益學舍」終於落成；再隔年，明秀湖雖小巧卻也能與青山應答。遺憾的是，就在2024，勤益大道核心的精神標的物小白宮/行政大樓被拆除了！慶幸的是：呂金龍和施世昱均不約而同以該建築為首要描寫對象，她以另一個姿態活了下來！
        </p>
        <p>
          　　這十年來，只要有機緣，便陸續央請呂金龍、吳清川、施世昱三人為勤益作畫，各以不同的觀察角度與空間氛圍為勤益留下千姿百態的記錄。雖然藝術家的創作觀點、媒材技法有異，但約好以｢具辨識性」作為最高原則，尤其以勤益人的共同記憶為題材。因此，從國秀樓、圖書館，至於各院系館的建築外觀，成為最主要的人文景觀描繪對象。但，整體校園空間的勾勒，並非空照圖，而是動態空間的尋蹤，既可以是大範圍的地圖式鳥瞰，也可以是羊腸小徑等較不大眾化的私密空間。此外，一些生活機能空間，如學生宿舍、青永館、運動場，甚至攸關同學生活費來源、位於舊校門前的第一銀行取款機亭，也在記錄之內。
        </p>
        <p>
          　　此外，除了典藏畫作由三位藝術家主導外，，不斷地有許多孩子在施世昱老師的帶領下，加入情憶勤益、彩繪勤益、勤益風華等名稱不同，卻做同一件事情的計畫中，更衍伸出不少以校園為元素的設計品。可惜的是，基於作品所有權，也因為經費有限，我們無法典藏同學們的優秀作品，只能透過評圖照片紀念一二。特在此向楊絮安、林紀葳、呂維玲等人，以及文化創意事業系第十屆至第十四屆(2017-2021)參與課程的同學們致謝！
        </p>
      </div>

      <div class="text">
        <p>
          　　最後，最重要的還是要再三再四向呂金龍、吳清川、施世昱三位好友致敬。筆者二十幾年來浸淫於藝術領域中，明知藝術市場的價值判斷模式，卻仍厚顏請託，當然是因為對彼此價值觀的認同與了解。面對世俗功業的虛幻性，大家更在意的是：在歷史洪流中能留下什麼？直到此刻，呂金龍還問我：可以重畫嗎？所謂：不惜以今我挑戰昨日之我，正是如此！
        </p>
        <p>
          　　是的，勤益一直在朝前邁進，而我輩以一生之力獻於校園終將一一遠離。我想的是：如何用畫筆產生如史筆般的功能，以供後來者追憶？
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  width: 100%;
  display: flex;
  justify-content: center;
  .container {
    display: flex;
    max-width: 900px;
    flex-direction: column;
    padding: 30px;
    img {
      width: 100%;
      max-height: 50vh;
      object-fit: cover;
      object-position: top;
    }
    .text {
      padding: 30px 0;
      p {
        line-height: 180%;
        margin-bottom: 20px;
        color: #283149;
        font-size: 18px;
        font-family: "LXGW WenKai Mono TC", serif;
      }
    }
  }
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
        }
      }
      .photo {
        width: 80%;
      }
    }
    .bottom{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .title{
        width: 79%;
        font-family: "LXGW WenKai Mono TC", serif;
      }
    }
  }
}
</style>
