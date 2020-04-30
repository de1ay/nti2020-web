import Vue from 'vue';
import Vuex from 'vuex';

import session from './session';
import users from './users';
import monitor from './monitor';

Vue.use(Vuex);

const store = {
  state: {},
  modules: {
    session,
    users,
    monitor,
  },
};

export default new Vuex.Store(store);
