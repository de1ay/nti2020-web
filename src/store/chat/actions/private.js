import axios from 'axios';

const actions = {
  async getRecievedMessages(store) {
    const { commit } = store;
    return await axios({
      url: `/chat/messages/`,
      method: 'GET',
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setRecievedMessages', resp.data);
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
  async getPrivateChat(store, userID) {
    const { rootGetters, commit, dispatch,  } = store;
    return await axios({
      url: `/chat/messages/user/${userID}/`,
      method: 'GET',
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setActiveChat', resp.data);
        commit('setActiveChatInfo', rootGetters['users/userByPrimaryID'][userID]);
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
  async sendPrivateMessage(store, {message, userID}) {
    const { rootState  } = store;
    return await axios({
      url: `/chat/messages/`,
      method: 'POST',
      data: {
        sender: rootState.session.user.primary_id,
        receiver: userID,
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
