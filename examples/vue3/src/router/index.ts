import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/about.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../pages/contact.vue"),
  },
  {
    path: "/help",
    name: "help",
    component: () => import("../pages/help.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
