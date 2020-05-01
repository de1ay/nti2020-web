const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setUser(state, payload) {
    state.user = {
      primary_id: payload.id,
      avatar: state.user.avatar,
      ...payload,
    };
  },
  setUserInfo(state, payload) {
    state.user = {
      ...state.user,
      ...payload,
      primary_id: state.user.id,
      avatar: payload.avatar,
    }
  }
};

export default mutations;
