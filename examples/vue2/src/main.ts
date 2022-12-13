import "@wizleap-inc/wiz-ui/dist/style.css";
import "./styles/global.css";
import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import router from "./router";

Vue.use(VueRouter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
