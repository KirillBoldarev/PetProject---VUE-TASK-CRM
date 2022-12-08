import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

// STYLES
import './styles/style.scss';
///

// PRIME VUE
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// PINIA
import { createPinia } from 'pinia';
import { subscribtionsForActionsUponComments } from './stores/plugins/subscribtionsForActionsUponComments';
import { subscribtionsForActionsUponTasks } from './stores/plugins/subscribtionsForActionsUponTasks';
import { subscribtionsForActionsUponUsers } from './stores/plugins/subscribtionsForActionsUponUsers';
const pinia = createPinia();
pinia.use(subscribtionsForActionsUponComments);
pinia.use(subscribtionsForActionsUponTasks);
pinia.use(subscribtionsForActionsUponUsers);

createApp(App)
  .use(pinia)
  .use(router)
  .use(PrimeVue)
  .directive('tooltip', Tooltip)
  .mount('#app');
