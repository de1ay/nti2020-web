const GeoPattern = require('geopattern');

function sortMessagesByDate(a, b) {
  a = new Date(a.timestamp);
  b = new Date(b.timestamp);
  return a>b ? 1 : (a<b ? -1 : 0)
}

const mutations = {
  setGroupChats(state, payload) {
    state.groupChats = payload.map(chat => ({
      ...chat,
      avatar: GeoPattern.generate(chat.name).toDataUri(),
    }));
  },
  setRecievedMessages(state, payload) {
    state.recievedMessages = payload;
  },
  setActiveChat(state, payload) {
    state.activeChat = payload;
  },
  setActiveChatInfo(state, payload) {
    state.activeChatInfo = {};
    if (payload.primary_id) {
      state.activeChatInfo.id    = payload.primary_id;
      state.activeChatInfo.title = payload.surname ? `${payload.surname} ${payload.name}` : payload.username;
      state.activeChatInfo.logo  = payload.avatar;
    } else {
      state.activeChatInfo.id    = payload.id;
      state.activeChatInfo.title = payload.name;
      state.activeChatInfo.owner = payload.owner;
      state.activeChatInfo.logo  = GeoPattern.generate(payload.name).toDataUri();
    }
  }
};

export default mutations;
