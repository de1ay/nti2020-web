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
  }, {})
};

export default getters;
