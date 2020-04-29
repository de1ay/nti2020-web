const getters = {
  isAuthorized: state => !!state.token, 
  // Permissions
  isUserAdmin: state => !!state.user.is_staff,
};

export default getters;
