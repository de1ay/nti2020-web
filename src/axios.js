import Vue from 'vue';
import Axios from 'axios';
import store from '@/store';

Axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
Axios.defaults.headers.common.Accept = 'application/json';

const { token } = store.state.session;
if (token) {
  Axios.defaults.headers.common.Authorization = `Token ${token}`;
}

Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios;
  },
});

export default Vue.$http;
