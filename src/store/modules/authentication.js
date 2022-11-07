export default {
  state: {
    authenticatedUser: {},
    isAuthenticated: false,
  },
  getters: {
    isAuth(state) {
      return state.isAuthenticated;
    },
    authenticatedUser(state) {
      return state.authenticatedUser;
    },
  },
  mutations: {
    authentication(state, user) {
      state.authenticatedUser = user;
      state.isAuthenticated = true;
      sessionStorage.setItem("authenticatedUserId", state.authenticatedUser.id);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.authenticatedUser = {};
      sessionStorage.removeItem("authenticatedUserId");
    },

    updateAuthenticated(state) {
      let id = sessionStorage.getItem("authenticatedUserId");
      if (id) {
        let userList = JSON.parse(localStorage.getItem("userList"));
        if (userList) {
          state.authenticatedUser = userList.find((user) => user.id === id);
          state.isAuthenticated = true;
        }
      }
    },
  },

  actions: {},
};
