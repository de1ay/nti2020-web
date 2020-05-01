import axios from 'axios';

const actions = {
  async getGroupChats(store) {
    const { rootState, commit, getters, dispatch } = store;
    return await axios({
      url: `/chat/chat-group/`,
      method: 'GET',
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        await dispatch('getChatUsers');
        commit('setGroupChats', {
          data: resp.data.results,
          user: rootState.session.user,
          bindByChatID: getters['usersByChatID'],
        });
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
    const { rootState, commit, getters, dispatch } = store;
    return await axios({
      url: `/chat/chat-message/${chatID}/`,
      method: 'GET',
    })
      .then(async resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setActiveChat', resp.data);
        dispatch('getGroupChats');
        await dispatch('getChatUsers');
        const bind = getters['usersByChatID'][chatID].find(bind => bind.user === rootState.session.user.primary_id);
        commit('setActiveChatInfo', {
          ...getters['groupChatByID'][chatID],
          notifications: bind.receive_notifications,
          bindID: bind.id,
        });
        return Promise.resolve(resp.data);
      })
      .catch(err => {
        return Promise.reject(err);
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
  async enableNotifications(store, { bindID, chatID }) {
    const { rootState } = store;
    return await axios({
      url: `/chat/chat-users/${bindID}/`,
      method: 'PUT',
      data: {
        id: bindID,
        receive_notifications: true,
        user: rootState.session.user.primary_id,
        chat: chatID,
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
  async disableNotifications(store, { bindID, chatID }) {
    const { rootState } = store;
    return await axios({
      url: `/chat/chat-users/${bindID}/`,
      method: 'PUT',
      data: {
        id: bindID,
        receive_notifications: false,
        user: rootState.session.user.primary_id,
        chat: chatID,
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
