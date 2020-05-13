import Vue from 'vue';
import VueCookies from 'vue-cookies';
import Icon from 'vue-awesome/components/Icon.vue';
import './assets/icons';
import store from './store/store';
import './assets/styles/main.scss';

import App from './App.vue';
import Step from './components/templates/Step.vue';
import VueRouter from 'vue-router';
import { router } from './components/router/router.js';

import { TablePlugin } from 'bootstrap-vue';

Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.use(TablePlugin);

VueCookies.config('7d');

Vue.config.productionTip = false;

Vue.component('Icon', Icon);
Vue.component('Step', Step);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
