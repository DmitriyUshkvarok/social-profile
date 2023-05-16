const getIsLoggedIn = state => state.auth.isAuthenticated;

const getIsRefreshing = state => state.auth.stateChange;

const authSelector = {
  getIsLoggedIn,
  getIsRefreshing,
};

export default authSelector;
