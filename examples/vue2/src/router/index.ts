import VueRouter, { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
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

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
