import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/HomePage/index.vue") },
  {
    path: "/page/:pageId",
    component: () => import("../views/DynamicPage.vue"),
    props: true
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
});

export default router;
