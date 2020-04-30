const getters = {
  userByPrimaryID: state => state.users.reduce((result, user) => {
    result[user.primary_id] = Object.assign(user);
    return result;
  }, {}),
};

export default getters;
