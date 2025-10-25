import { createApp } from "vue";
import { createPinia } from "pinia";
import Materializecss from "./plugins/Materializecss.ts";
import App from "./App.vue";
import "./assets/styles/scss/styles.scss";

createApp(App).use(createPinia()).use(Materializecss).mount("#app");
