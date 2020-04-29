import axios from 'axios';

const actions = {
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
  async createUser(store, user) {
    const { dispatch } = store;
    return await axios({
      url: `/api/users/`,
      method: 'POST',
      data: { username: user.username, email: user.email, is_staff: user.is_staff },
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        return dispatch('setUserPassword', {
          ...user,
          id: resp.data.id,
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
  async setUserPassword(store, user) {
    const { dispatch } = store;
    return await axios({
      url: `/api/users/${user.id}/change_password/`,
      method: 'PUT',
      data: { new_password: user.password },
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        return dispatch('createUserInfo', user);
      })
      .catch(err => {
        const data = err.response.data;
        if (data.detail) {
          return Promise.reject(data.detail);
        }
        return Promise.reject(data);
      });
  },
  async createUserInfo(store, user) {
    const { dispatch } = store;
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('surname', user.surname);
    formData.append('patronymic', user.patronymic);
    formData.append('age', user.age);
    formData.append('position', user.position);
    formData.append('experience', user.experience);
    formData.append('avatar', user.avatar);
    formData.append('user', user.id);
    return await axios({
      url: `/api/users-info/`,
      method: 'POST',
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      data: formData,
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        dispatch('getUsers');
        return Promise.resolve(user);
      })
      .catch(err => {
        const data = err.response.data;
        if (data.detail) {
          return Promise.reject(data.detail);
        }
        return Promise.reject(data);
      });
  },
  async updateUserInfo(store, user) {
    const { dispatch } = store;
    return await axios({
      url: `/v1/users-info/${user.id}/`,
      method: 'PUT',
      data: { ...user },
    })
      .then(resp => {
        if (resp.data.error !== undefined) {
          return Promise.reject(resp.data.error);
        }
        dispatch('getUsers');
        return Promise.resolve(user);
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
