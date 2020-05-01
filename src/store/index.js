import Vue from 'vue';
import Vuex from 'vuex';

import session from './session';
import users from './users';
import monitor from './monitor';
import chat from './chat';
import map from './map';

Vue.use(Vuex);

const store = {
  state: {},
  modules: {
    session,
    users,
    monitor,
    chat,
    map,
  },
};

export default new Vuex.Store(store);
