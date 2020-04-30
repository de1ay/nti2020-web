import axios from 'axios';

const actions = {
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
    const { commit, getters, dispatch } = store;
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
        commit('setActiveChatInfo', getters['groupChatByID'][chatID]);
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
  async sendChatMessage(store, {message, chatID}) {
    const { rootState,  } = store;
    return await axios({
      url: `/chat/chat-message/`,
      method: 'POST',
      data: {
        sender: rootState.session.user.primary_id,
        chat: chatID,
        message,
      }
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        return Promise.resolve(resp.data);
      })
      .catch(err => {
        const data = err.response.data;
        if (data.detail) {
          return Promise.reject(data.detail);
        }
        return Promise.reject(data);
      });
  }
};

export default actions;
