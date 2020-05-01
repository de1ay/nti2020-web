const GeoPattern = require('geopattern');

const mutations = {
  setGroupChats(state, { data, user, bindByChatID }) {
    state.groupChats = data.map(chat => ({
      ...chat,
      avatar: GeoPattern.generate(`${chat.id}-${chat.name}`).toDataUri(),
    })).filter(chat => {
      return !!bindByChatID[chat.id].find(bind => bind.user === user.primary_id);
    });
  },
  setChatUsers(state, payload) {
    state.chatUsers = payload;
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
      state.activeChatInfo.notifications = payload.notifications;
      state.activeChatInfo.bindID = payload.bindID;
      state.activeChatInfo.logo  = GeoPattern.generate(`${payload.id}-${payload.name}`).toDataUri();
    }
  }
};

export default mutations;
