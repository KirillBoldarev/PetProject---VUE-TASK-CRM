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
      this.state.authenticatedUser = user;
      console.log(
        "this.state.authenticatedUser :",
        this.state.authenticatedUser
      );
      this.state.isAuthenticated = true;
      console.log("state.isAuthenticated", this.state.isAuthenticated);
    },
    logoutCurrentUser(state) {
      this.state.isAuthenticated = false;
      this.state.authenticatedUser = {};
      console.log("де-аутентификация прошла успешно");
    },
    info() {
      console.log("this.authenticatedUser :", this.state.authenticatedUser);
      console.log("this.isAuthenticated :", this.state.isAuthenticated);
    },
  },
  actions: {},
};
