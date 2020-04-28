import Vue from 'vue';
import Vuex from 'vuex';

import session from './session';

Vue.use(Vuex);

const store = {
  state: {},
  modules: {
    session,
  },
};

export default new Vuex.Store(store);
