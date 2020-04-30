const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setUser(state, payload) {
    state.user = {
      primary_id: payload.id,
      ...payload,
    };
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
