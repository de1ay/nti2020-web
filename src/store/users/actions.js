import axios from 'axios';

import CUD from './actions/CUD';

const actions = {
  ...CUD,
  async getUsers(store) {
    const { commit, dispatch } = store;
    return await axios({
      url: `/api/users/`,
      method: 'GET',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setUsers', resp.data.results);
        dispatch('getUsersInfo');
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
  async getUsersInfo(store) {
    const { commit } = store;
    return await axios({
      url: `/api/users-info/`,
      method: 'GET',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setUsersInfo', resp.data.results);
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
  async getUser(store, id) {
    const { commit, dispatch } = store;
    return await axios({
      url: `/api/users/${id}/`,
      method: 'GET',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setUser', resp.data);
        dispatch('getUserInfo', id);
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
  async getUserInfo(store, id) {
    const { commit } = store;
    return await axios({
      url: `/api/users-info/${id}/`,
      method: 'GET',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setUserInfo', resp.data);
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
