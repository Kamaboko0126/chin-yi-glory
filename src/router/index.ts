import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/HomePage/index.vue") },
  {
    path: "/page/:pageId",
    component: () => import("../views/DynamicPage.vue"),
    props: true
  },
  // 藝術品頁面路由 (使用query參數)
  {
    path: "/page/artwork",
    component: () => import("../views/ArtworkDetailPage/index.vue"),
    props: (route: any) => ({ id: route.query.id })
  },
  // 保持向後兼容的舊路由（重定向到新的動態路由）
  {
    path: "/curationintro",
    redirect: "/page/curation"
  },
  {
    path: "/schoolintro",
    redirect: "/page/school"
  },
  {
    path: "/founderintro",
    redirect: "/page/founder"
  },
  {
    path: "/foundationintro",
    redirect: "/page/foundation"
  },
  {
    path: "/artworksintro",
    redirect: "/page/artworks"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // 如果有保存的位置（例如瀏覽器後退/前進），使用保存的位置
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        }, 300);
      });
    }
    
    // 如果路由有 hash，滾動到對應的元素
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth'
          });
        }, 300);
      });
    }
    
    // 默認情況下，滾動到頁面頂部
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          top: 0, 
          left: 0,
          behavior: 'smooth'
        });
      }, 300);
    });
  }
});

export default router;
