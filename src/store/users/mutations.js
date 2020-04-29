const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  },
  setUsersInfo(state, payload) {
    state.users = state.users.map(user => {
      const userInfo = payload.find(info => info.id === user.id);
      return {
        ...user,
        ...userInfo,
      }
    })
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setUserInfo(state, payload) {
    state.user = {
      ...state.user,
      ...payload,
    }
  }
};

export default mutations;
