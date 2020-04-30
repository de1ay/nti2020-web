import axios from 'axios';

import Private from './actions/private';

const actions = {
  ...Private,
  async getGroupChats(store) {
    const { commit } = store;
    return await axios({
      url: `/chat/chat-group/`,
      method: 'GET',
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setGroupChats', resp.data.results);
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
  async getGroupChat(store, chatID) {
    const { rootGetters, commit, dispatch } = store;
    return await axios({
      url: `/chat/chat-message/${chatID}/`,
      method: 'GET',
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setActiveChat', resp.data);
        await dispatch('getGroupChats');
        commit('setActiveChatInfo', rootGetters['groupChatByID'][chatID]);
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
