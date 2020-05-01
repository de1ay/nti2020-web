import axios from 'axios';

const actions = {
  async getUser(store) {
    const { commit, dispatch } = store;
    return await axios({
      url: `/api/users/me/`,
      method: 'GET',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setUser', resp.data);
        dispatch('getUserInfo');
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
  async getUserInfo(store) {
    const { state, commit } = store;
    return await axios({
      url: `/api/users-info/user/${state.user.id}/`,
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
          return Promise.resolve(data.detail);
        }
        return Promise.resolve(data);
      });
  },
  async authorize(store, { login, password }) {
    const { commit } = store;
    return await axios({
      url: `/rest-auth/login/`,
      method: 'POST',
      data: {
        password,
        username: login,
      },
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setToken', resp.data.key);
        localStorage.setItem('token', resp.data.key);
        axios.defaults.headers.common.Authorization = `Token ${resp.data.key}`;
        return Promise.resolve(resp.data);
      })
      .catch(err => {
        const data = err.response.data;
        if (data.non_field_errors) {
          return Promise.reject(data.non_field_errors);
        }
        return Promise.reject(data);
      });
  },
  async logout(store) {
    const { commit } = store;
    return await axios({
      url: `/rest-auth/logout/`,
      method: 'POST',
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        commit('setToken', null);
        localStorage.removeItem('token');
        axios.defaults.headers.common.Authorization = ``;
        return Promise.resolve(resp.data);
      })
      .catch(resp => {
        commit('setToken', null);
        localStorage.removeItem('token');
        axios.defaults.headers.common.Authorization = ``;
        if (resp.non_field_errors) {
          return Promise.resolve(resp.non_field_errors);
        }
        return Promise.resolve(resp);
      });
  },
};

export default actions;
