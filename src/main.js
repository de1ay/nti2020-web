import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import './axios';

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  position: 'top-right',
  duration: 2000,
  keepOnHover: true,
  theme: 'bubble',
});

import Icon from 'vue-awesome/components/Icon';
Vue.component('v-icon', Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
