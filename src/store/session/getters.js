const getters = {
  isAuthorized: state => !!state.token, 
  // Permissions
  isUserHighManager: state => !!(state.user.groups && state.user.groups.find(group => group === 8)),
  isUserManager: state => !!(state.user.groups && state.user.groups.find(group => group === 7)),
  isUserEmployee: state => !!(state.user.groups && state.user.groups.find(group => group === 6)),
};

export default getters;
