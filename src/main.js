import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import filterDate from "./js/filterDate";



// STYLES
import "./styles/style.scss";
import "vue-select/dist/vue-select.css";
///

//COMPONENTS
/* import vSelect from "vue-select"; */
//

// PRIME VUE
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
///

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use("filterDate", filterDate)
  .directive("tooltip", Tooltip)
/*   .component("v-select", vSelect) */
  .mount("#app");
