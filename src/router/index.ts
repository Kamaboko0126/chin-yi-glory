import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/HomePage/index.vue") },
  {
    path: "/curationintro",
    component: () => import("../views/CurationIntro.vue"),
  },
  {
    path: "/schoolintro",
    component: () => import("../views/SchoolIntro.vue"),
  },
  {
    path: "/founderintro",
    component: () => import("../views/FounderIntro.vue"),
  },
  //   {
  //     path: "/admin",
  //     component: () => import("../views/Admin/index.vue"),
  //     children: [
  //       {
  //         path: "format/:type",
  //         component: () => import("../views/Admin/format.vue"),
  //       },
  //       {
  //         path: "antique/:type",
  //         component: () => import("../views/Admin/antique.vue"),
  //       },
  //     ],
  //   },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
