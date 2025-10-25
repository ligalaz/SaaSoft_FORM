import { createApp } from "vue";
import { createPinia } from "pinia";
import Materializecss from "./plugins/Materializecss.ts";
import App from "./App.vue";

createApp(App).use(createPinia()).use(Materializecss).mount("#app");
