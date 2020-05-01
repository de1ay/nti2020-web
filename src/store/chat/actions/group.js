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
        dispatch('getChatUsers');
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
    const { rootState } = store;
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
  },
  async createChat(store, name) {
    const { rootState, dispatch } = store;
    return await axios({
      url: `/chat/chat-group/`,
      method: 'POST',
      data: {
        owner: rootState.session.user.primary_id,
        name,
      }
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        return dispatch('addUserToChat', {
          userID: rootState.session.user.primary_id,
          chatID: resp.data.id,
          notifications: true,
        });
      })
      .catch(err => {
        const data = err.response.data;
        if (data.detail) {
          return Promise.reject(data.detail);
        }
        return Promise.reject(data);
      });
  },
  async updateChat(store, { id, name }) {
    const { rootState } = store;
    return await axios({
      url: `/chat/chat-group/${id}/`,
      method: 'PUT',
      data: {
        owner: rootState.session.user.primary_id,
        name,
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
  },
  async deleteChat(store, chatID) {
    const { dispatch } = store;
    return await axios({
      url: `/chat/chat-group/${chatID}/`,
      method: 'DELETE',
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
  },
  async addUserToChat(store, { userID, chatID, notifications }) {
    return await axios({
      url: `/chat/chat-users/`,
      method: 'POST',
      data: {
        user: userID,
        chat: chatID,
        receive_notifications: notifications,
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
  },
  async removeUserFromChat(store, instanceID) {
    return await axios({
      url: `/chat/chat-users/${instanceID}`,
      method: 'DELETE',
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
  },
  async enableNotifications(store, { instanceID, chatID }) {
    const { rootState } = store;
    return await axios({
      url: `/chat/chat-users/${instanceID}/`,
      method: 'PUT',
      data: {
        id: chatID,
        receive_notifications: true,
        user: rootState.session.user.primary_id,
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
  },
  async disableNotifications(store, { instanceID, chatID }) {
    const { rootState } = store;
    return await axios({
      url: `/chat/chat-users/${instanceID}/`,
      method: 'PUT',
      data: {
        id: chatID,
        receive_notifications: false,
        user: rootState.session.user.primary_id,
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
  },
};

export default actions;
