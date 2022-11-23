import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import filterDate from "./js/filterDate";

import "./styles/style.scss";

import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Localbase from "localbase";

let localbase = new Localbase("localbase");
localbase.config.debug = false;

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(localbase)
  .use("filterDate", filterDate)
  .directive("tooltip", Tooltip)
  .mount("#app");
