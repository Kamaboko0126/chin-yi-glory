// 頁面配置文件
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
}

export interface LayoutSection {
  type: 'text' | 'cards' | 'title' | 'image';
  content?: string | string[]; // 文字內容的 key 或 key 陣列
  component?: string; // 組件名稱
  title?: string; // 標題 key
  image?: string; // 圖片路徑
  className?: string; // 自定義樣式類別
}

// 頁面配置
export const pageConfigs: Record<string, PageConfig> = {
  curation: {
    id: 'curation',
    titleKey: '關於此展覽',
    subtitleKey: '副標題',
    localeFile: 'curationIntro',
    components: [
      { name: 'CardGroup1', path: '../components/CurationIntro/CardGroup1.vue' },
      { name: 'CardGroup2', path: '../components/CurationIntro/CardGroup2.vue' }
    ],
    layout: [
      {
        type: 'text',
        content: ['section1', 'section2']
      },
      {
        type: 'cards',
        component: 'CardGroup1'
      },
      {
        type: 'text',
        content: ['section3', 'section4', 'section5', 'section6']
      },
      {
        type: 'cards',
        component: 'CardGroup2'
      },
      {
        type: 'text',
        content: ['section7', 'section8']
      }
    ]
  },
  
  founder: {
    id: 'founder',
    titleKey: 'title1',
    localeFile: 'founderIntro',
    components: [
      { name: 'CardGroup1', path: '../components/FounderIntro/CardGroup1.vue' }
    ],
    layout: [
      {
        type: 'text',
        content: ['section1']
      },
      {
        type: 'title',
        title: 'title2'
      },
      {
        type: 'text',
        content: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9', 'section10', 'section11']
      },
      {
        type: 'title',
        title: 'title3'
      },
      {
        type: 'text',
        content: ['section12', 'section13', 'section14', 'section15', 'section16', 'section17', 'section18', 'section19', 'section20', 'section21', 'section22', 'section23']
      },
      {
        type: 'cards',
        component: 'CardGroup1'
      }
    ]
  },
  
  school: {
    id: 'school',
    titleKey: '學校介紹',
    localeFile: 'schoolIntro',
    components: [
      { name: 'CardGroup1', path: '../components/SchoolIntro/CardGroup1.vue' }
    ],
    layout: [
      {
        type: 'text',
        content: ['section1', 'section2', 'section3']
      },
      {
        type: 'cards',
        component: 'CardGroup1'
      },
      {
        type: 'text',
        content: ['section4', 'section5', 'section6', 'section7']
      }
    ]
  }
};
