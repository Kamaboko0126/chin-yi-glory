// 頁面配置文件

// 圖片資源配置 - 使用 public 目錄路徑
export const imageAssets = {
  curation: {
    pic1: "/curation/02.jpg",
    pic2: "/curation/03.jpg",
    pic3: "/curation/04.jpg",
    pic4: "/curation/05.jpg",
    pic5: "/curation/06.jpg",
    pic6: "/curation/07.jpg",
    pic7: "/curation/08.jpg",
    pic8: "/curation/09.jpg",
    pic9: "/curation/10.jpg",
    pic10: "/curation/11.jpg",
    pic11: "/curation/12.jpg",
    pic12: "/curation/13.jpg",
  },
  school: {
    pic1: "/school/02.jpg",
    pic2: "/school/04.jpg",
  },
  founder: {
    pic1: "/founder/01.jpg",
    pic2: "/founder/02.jpg",
    pic3: "/founder/03.jpg",
  },
};

// 頁面配置接口
export interface PageConfig {
  id: string;
  titleKey: string;
  subtitleKey?: string;
  enTitleKey?: string;
  enSubtitleKey?: string;
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
    titleKey: "勤益風華展覽",
    enTitleKey: "General Introduction of the Curation",
    // subtitleKey: "副標題",
    // enSubtitleKey: "Subtitle",
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
          autoplayInterval: 6000, // 增加到8秒
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
          autoplayInterval: 8000, // 增加到8秒
        },
      },
      {
        type: "text",
        content: ["section7", "section8"],
      },
    ],
  },
  school: {
    id: "school",
    titleKey: "國立勤益科技大學",
    enTitleKey: "An Introduction to National Chin-Yi",
    subtitleKey: "勤益簡介：換個視野看｢勤益」",
    enSubtitleKey: 'University of Technology: A Different Perspective on “Chin-Yi”',
    localeFile: "schoolIntro",
    components: [
      {
        name: "DynamicCardGroup",
        path: "../components/common/DynamicCardGroup.vue",
      },
    ],
    layout: [
      {
        type: "image",
        image: "/school/01.jpg",
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
          autoplayInterval: 8000, // 增加到8秒
        },
      },
      {
        type: "text",
        content: ["section4", "section5", "section6", "section7"],
      },
    ],
  },
  founder: {
    id: "founder",
    titleKey: "張明將軍與王國秀女士",
    enTitleKey: "General Zhang Ming and Wang Guo-Hsiu",
    // subtitleKey: "副標題",
    // enSubtitleKey: "Subtitle",
    localeFile: "founderIntro",
    components: [
      {
        name: "DynamicCardGroup",
        path: "../components/common/DynamicCardGroup.vue",
      },
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
            { image: imageAssets.founder.pic3, descriptionKey: "pic3" },
          ],
          localeFile: "founderIntro",
          autoplayInterval: 8000, // 增加到8秒
        },
      },
    ],
  },
  foundation: {
    id: "foundation",
    titleKey: "張明王國秀基金會",
    enTitleKey:
      "Introduction of Cultural and Educational Foundation of Ming Chang and Kuo-Hsiu Wang",
    // subtitleKey: "副標題",
    // enSubtitleKey: "Subtitle",
    localeFile: "foundationIntro",
    components: [
      {
        name: "DynamicCardGroup",
        path: "../components/common/DynamicCardGroup.vue",
      },
    ],
    layout: [
      {
        type: "text",
        content: ["section1","section2"],
      },
      {
        type: "text",
        content: ["section3", "section4", "section5"],
      },
      {
        type: "text",
        content: ["section6"],
      },
      {
        type: "image",
        image: "/foundation/01.jpg",
      },
    ],
  },
  artworks:{
    id: "artworks",
    titleKey: "藝術家眼中的校園",
    enTitleKey: "The Chin-yi Campus Through The Eyes of Artists",
    subtitleKey: "副標題",
    enSubtitleKey: "Subtitle",
    localeFile: "artworksIntro",
    components: [
      {
        name: "DynamicCardGroup",
        path: "../components/common/DynamicCardGroup.vue",
      },
    ],
    layout: [
      {
        type: "title",
        title: "title1",
      },
    ],
  }
};
