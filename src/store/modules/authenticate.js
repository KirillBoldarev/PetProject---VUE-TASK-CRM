export default {
  state: {
    authenticatedUser: {},
    isAuthenticated: false,
  },
  getters: {
    checkForAuthenticate(state) {
      return state.isAuthenticated;
    },
    authenticatedUser(state) {
      return state.authenticatedUser;
    },
  },
  mutations: {
    authenticateCurrentUser(state, user) {
      state.authenticatedUser = user;
      state.isAuthenticated = true;
      sessionStorage.setItem("authenticatedUserId", state.authenticatedUser.id);
    },

    logoutCurrentUser(state) {
      state.isAuthenticated = false;
      state.authenticatedUser = {};
      sessionStorage.removeItem("authenticatedUserId");
    },
  },
  actions: {},
};
