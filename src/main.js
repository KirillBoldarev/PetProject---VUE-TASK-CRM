import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { Vue3Mq } from 'vue3-mq';

// STYLES
import './styles/style.scss';
///

// PRIME VUE
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// PINIA - вынести в отдельный файл
import { createPinia } from 'pinia';
import { subscribtionsForActionsUponComments } from './stores/plugins/subscribtionsForActionsUponComments';
import { subscribtionsForActionsUponTasks } from './stores/plugins/subscribtionsForActionsUponTasks';
import { subscribtionsForActionsUponUsers } from './stores/plugins/subscribtionsForActionsUponUsers';
const pinia = createPinia();
pinia.use(subscribtionsForActionsUponComments);
pinia.use(subscribtionsForActionsUponTasks);
pinia.use(subscribtionsForActionsUponUsers);

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

createApp(App)
  .component('v-select', vSelect)
  .use(pinia)
  .use(router)
  .use(PrimeVue)
  .use(Vue3Mq, {
    preset: 'devices',
  })
  .directive('tooltip', Tooltip)
  .mount('#app');
