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
      console.log(
        "this.$store.state.authenticate.authenticatedUser :",
        state.authenticatedUser
      );
      state.isAuthenticated = true;
      console.log(
        " this.$store.state.authenticate.isAuthenticated:",
        state.isAuthenticated
      );
    },
    logoutCurrentUser(state) {
      state.isAuthenticated = false;
      state.authenticatedUser = {};
      console.log("де-аутентификация прошла успешно");
    },
  },
  actions: {},
};
