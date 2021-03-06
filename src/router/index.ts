import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
