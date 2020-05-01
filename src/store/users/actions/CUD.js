import axios from 'axios';

const actions = {
  async createUser(store, user) {
    const { dispatch } = store;
    return await axios({
      url: `/api/users/`,
      method: 'POST',
      data: { username: user.username, email: user.email, is_staff: user.is_staff, groups: user.groups },
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