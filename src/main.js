import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import './axios';

import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/trash';
import 'vue-awesome/icons/times';
import 'vue-awesome/icons/search';

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  position: 'top-right',
  duration: 2000,
  keepOnHover: true,
  theme: 'bubble',
});

import Icon from 'vue-awesome/components/Icon';
Vue.component('v-icon', Icon);

import { directive as onClickOutside } from 'vue-on-click-outside';
Vue.directive('on-click-outside', onClickOutside);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
