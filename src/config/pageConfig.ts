// 頁面配置文件

// 圖片資源配置 - 使用直接路徑（Vite 會自動處理）
export const imageAssets = {
  curation: {
    pic1: '/src/assets/curation/02.jpg',
    pic2: '/src/assets/curation/03.jpg',
    pic3: '/src/assets/curation/04.jpg',
    pic4: '/src/assets/curation/05.jpg',
    pic5: '/src/assets/curation/06.jpg',
    pic6: '/src/assets/curation/07.jpg',
    pic7: '/src/assets/curation/08.jpg',
    pic8: '/src/assets/curation/09.jpg',
    pic9: '/src/assets/curation/10.jpg',
    pic10: '/src/assets/curation/11.jpg',
    pic11: '/src/assets/curation/12.jpg',
    pic12: '/src/assets/curation/13.jpg',
  },
  school: {
    pic1: '/src/assets/school/02.jpg',
    pic2: '/src/assets/school/04.jpg',
  },
  founder: {
    // 創辦人目前使用學校圖片
    pic1: '/src/assets/school/02.jpg',
    pic2: '/src/assets/school/04.jpg',
  }
};

// 頁面配置接口
export interface PageConfig {
  id: string;
  titleKey: string;
  subtitleKey?: string;
  localeFile: string;
  components?: ComponentConfig[];
  layout: LayoutSection[];
}

export interface ComponentConfig {
  name: string;
  path: string;
  props?: any; // 組件的 props
}

export interface CardItem {
  image: string;
  descriptionKey: string;
}

export interface LayoutSection {
  type: "text" | "cards" | "title" | "image";
  content?: string | string[]; // 文字內容的 key 或 key 陣列
  component?: string; // 組件名稱
  title?: string; // 標題 key
  image?: string; // 圖片路徑
  className?: string; // 自定義樣式類別
  props?: {
    items?: CardItem[];
    localeFile?: string;
    autoplayInterval?: number;
    numVisible?: number;
    numScroll?: number;
  }; // 組件的 props
}

// 頁面配置
export const pageConfigs: Record<string, PageConfig> = {
  curation: {
    id: "curation",
    titleKey: "關於此展覽",
    subtitleKey: "副標題",
    localeFile: "curationIntro",
    components: [
      {
        name: "DynamicCardGroup",
        path: "../components/common/DynamicCardGroup.vue",
      },
    ],
    layout: [
      {
        type: "text",
        content: ["section1", "section2"],
      },
      {
        type: "cards",
        component: "DynamicCardGroup",
        props: {
          items: [
            { image: imageAssets.curation.pic1, descriptionKey: "pic1" },
            { image: imageAssets.curation.pic2, descriptionKey: "pic2" },
            { image: imageAssets.curation.pic3, descriptionKey: "pic3" },
          ],
          localeFile: "curationIntro",
          autoplayInterval: 4000,
        },
      },
      {
        type: "text",
        content: ["section3", "section4", "section5", "section6"],
      },
      {
        type: "cards",
        component: "DynamicCardGroup",
        props: {
          items: [
            { image: imageAssets.curation.pic4, descriptionKey: "pic4" },
            { image: imageAssets.curation.pic5, descriptionKey: "pic5" },
            { image: imageAssets.curation.pic6, descriptionKey: "pic6" },
            { image: imageAssets.curation.pic7, descriptionKey: "pic7" },
            { image: imageAssets.curation.pic8, descriptionKey: "pic8" },
            { image: imageAssets.curation.pic9, descriptionKey: "pic9" },
            { image: imageAssets.curation.pic10, descriptionKey: "pic10" },
            { image: imageAssets.curation.pic11, descriptionKey: "pic11" },
            { image: imageAssets.curation.pic12, descriptionKey: "pic12" },
          ],
          localeFile: "curationIntro",
          autoplayInterval: 5000,
        },
      },
      {
        type: "text",
        content: ["section7", "section8"],
      },
    ],
  },

  founder: {
    id: "founder",
    titleKey: "張明將軍與王國秀女士",
    subtitleKey: "副標題",
    localeFile: "founderIntro",
    components: [
      { name: "DynamicCardGroup", path: "../components/common/DynamicCardGroup.vue" },
    ],
    layout: [
      {
        type: "text",
        content: ["section1"],
      },
      {
        type: "title",
        title: "title2",
      },
      {
        type: "text",
        content: [
          "section1",
          "section2",
          "section3",
          "section4",
          "section5",
          "section6",
          "section7",
          "section8",
          "section9",
          "section10",
          "section11",
        ],
      },
      {
        type: "title",
        title: "title3",
      },
      {
        type: "text",
        content: [
          "section12",
          "section13",
          "section14",
          "section15",
          "section16",
          "section17",
          "section18",
          "section19",
          "section20",
          "section21",
          "section22",
          "section23",
        ],
      },
      {
        type: "cards",
        component: "DynamicCardGroup",
        props: {
          items: [
            { image: imageAssets.founder.pic1, descriptionKey: "pic1" },
            { image: imageAssets.founder.pic2, descriptionKey: "pic2" },
          ],
          localeFile: "founderIntro",
          autoplayInterval: 4000,
        },
      },
    ],
  },

  school: {
    id: "school",
    titleKey: "學校介紹",
    localeFile: "schoolIntro",
    components: [
      { name: "DynamicCardGroup", path: "../components/common/DynamicCardGroup.vue" },
    ],
    layout: [
      {
        type: "image",
        image: new URL("../assets/school/01.jpg", import.meta.url).href,
        title: "banner",
      },
      {
        type: "text",
        content: ["section1", "section2", "section3"],
      },
      {
        type: "cards",
        component: "DynamicCardGroup",
        props: {
          items: [
            { image: imageAssets.school.pic1, descriptionKey: "pic1" },
            { image: imageAssets.school.pic2, descriptionKey: "pic3" },
          ],
          localeFile: "schoolIntro",
          autoplayInterval: 4000,
        },
      },
      {
        type: "text",
        content: ["section4", "section5", "section6", "section7"],
      },
    ],
  },
};
