import "@wizleap-inc/wiz-ui-next/dist/style.css";
import "./styles/global.css";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router as any);
app.mount("#app");
