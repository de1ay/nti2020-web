import axios from 'axios';

const actions = {
  async getUsers(store) {
    const { commit } = store;
    return await axios({
      url: `/api/users-info/`,
      method: 'GET',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setUsers', resp.data);
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
