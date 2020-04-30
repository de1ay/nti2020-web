const mutations = {
  setUsers(state, payload) {
    state.users = payload.map(user => ({
      primary_id: user.id,
      ...user,
    }));
  },
  setUsersInfo(state, payload) {
    state.users = state.users.map(user => {
      const userInfo = payload.find(info => info.user === user.id);
      return {
        primary_id: user.id,
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
      primary_id: state.user.id,
      ...state.user,
      ...payload,
    }
  }
};

export default mutations;
