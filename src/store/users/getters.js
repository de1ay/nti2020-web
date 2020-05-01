const getters = {
  userByPrimaryID: state => state.users.reduce((result, user) => {
    result[user.primary_id] = Object.assign(user);
    return result;
  }, {}),
  groupByID: state => state.groups.reduce((result, group) => {
    result[group.prop] = Object.assign(group);
    return result;
  }, {}),
};

export default getters;
