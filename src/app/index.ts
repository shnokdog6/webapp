import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import { router } from "./router/router";
import "./index.css";

export const app = createApp(App).use(createPinia()).use(router);
