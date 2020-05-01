import axios from 'axios';

import Group from './actions/group';
import Private from './actions/private';

const actions = {
  ...Group,
  ...Private,
  async getChatUsers(store) {
    const { commit } = store;
    return await axios({
      url: `/chat/chat-users/`,
      method: 'GET',
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setChatUsers', resp.data.results);
        return Promise.resolve(resp.data);
      })
      .catch(err => {
        const data = err.response.data;
        if (data.detail) {
          return Promise.reject(data.detail);
        }
        return Promise.reject(data);
      });
  },
};

export default actions;
