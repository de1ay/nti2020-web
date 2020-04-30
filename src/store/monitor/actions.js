import axios from 'axios';

const actions = {
    async getMonitorData(store, params) {
        const { commit } = store;
        return await axios({
            url: `/mon/record/`,
            method: 'GET',
            params: params,
        })
            .then(resp => {
                if (resp.data.error !== undefined) {
                    return Promise.reject(resp.data.error);
                }
                commit('setActiveData', resp.data.results);
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
