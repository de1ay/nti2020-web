import axios from 'axios';

const actions = {
  async getChatWithUser(store, userID) {
    const { rootState, commit } = store;
    return await axios({
      url: `/chat/messages/user/${userID}/`,
      method: 'GET',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setActiveChat', resp.data.results);
        await dispatch('users/getUser', userID, { root: true });
        commit('setActiveChatInfo', rootState.users.user);
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
