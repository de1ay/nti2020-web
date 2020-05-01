import axios from 'axios';

const actions = {
    async getMonitorData(store, params) {
        const {commit} = store;
        let answer = [];
        let results = await axios({
            url: `/mon/record/`,
            method: 'GET',
            params: params,
        })
            .then(resp => {
                if (resp.data.error !== undefined) {
                    return Promise.reject(resp.data.error);
                }
                return Promise.resolve(resp.data);
            })
            .catch(err => {
                const data = err.response.data;
                if (data.detail) {
                    return Promise.reject(data.detail);
                }
                return Promise.reject(data);
            });
        if (results.results.length > 0) answer.push(...results.results);
        async function cont(nextt, answerr) {
            let new_data = await axios({
                url: nextt,
                method: 'GET',
            }).then(resp => {
                if (resp.data.error !== undefined) {
                    return Promise.reject(resp.data.error);
                }
                return Promise.resolve(resp.data);
            })
                .catch(err => {
                    const data = err.response.data;
                    if (data.detail) {
                        return Promise.reject(data.detail);
                    }
                    return Promise.reject(data);
                });
            if (new_data.results !== undefined) if (new_data.results.length > 0) answerr.push(...new_data.results);
            if (new_data.next) {
                return cont(new_data.next, answerr);
            } else {
                return answerr;
            }
        }
        answer = await cont(results.next, answer);
        commit('setActiveData', answer);
        return answer;
    },
    async getLastData(store) {
        const {commit} = store;
        return await axios({
            url: `/mon/record/get_last_info/`,
            method: 'GET',
        })
            .then(resp => {
                if (resp.data.error !== undefined) {
                    return Promise.reject(resp.data.error);
                }
                commit('setLastData', resp.data)
                return Promise.resolve(resp.data);
            })
            .catch(err => {
                const data = err.response.data;
                if (data.detail) {
                    return Promise.reject(data.detail);
                }
                return Promise.reject(data);
            });
    }
};

export default actions;
