const getters = {
  isAuthorized: state => !!state.token, 
  // Permissions
  isUserHighManager: state => state.user.groups && state.user.groups.length > 0 && state.user.groups[state.user.groups.length - 1] === 8,
  isUserManager: state => state.user.groups && state.user.groups.length > 0 && state.user.groups[state.user.groups.length - 1] === 7,
  isUserEmployee: state => state.user.groups && state.user.groups.length > 0 && state.user.groups[state.user.groups.length - 1] === 6,
};

export default getters;
