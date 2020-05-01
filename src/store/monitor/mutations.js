const mutations = {
    setActiveData(state, payload) {
        state.ActiveData = payload;
    },
    setLastData(state, payload) {
        state.LastData = payload;
    }
};

export default mutations;
