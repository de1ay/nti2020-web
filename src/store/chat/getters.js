const GeoPattern = require('geopattern');

const getters = {
  groupChatByID: state => state.groupChats.reduce((result, chat) => {
    result[chat.id] = Object.assign(chat);
    return result;
  }, {}),
  privateChats: state => state.recievedMessages.reduce((result, msg) => {
    if (result[msg.sender]) {
      result[msg.sender].message = msg.message;
      result[msg.sender].time = msg.timestamp;
    } else {
      result[msg.sender] = {
        userID: msg.sender,
        message: msg.message,
        time: msg.timestamp,
      }
    }
    return result;
  }, {}),
  usersByChatID: state => state.chatUsers.reduce((result, bind) => {
    if (result[bind.chat]) {
      result[bind.chat].push(bind);
    } else {
      result[bind.chat] = [bind];
    }
    return result;
  }, {}),
};

export default getters;
