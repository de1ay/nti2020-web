import Vue from 'vue';
import Vuex from 'vuex';

import session from './session';
import users from './users';

Vue.use(Vuex);

const store = {
  state: {},
  modules: {
    session,
    users,
  },
};

export default new Vuex.Store(store);
