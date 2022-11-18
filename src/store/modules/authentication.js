import localbase from "@/js/localbase";

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

    updateAuthenticated(state, resultOfAction) {
      let id = sessionStorage.getItem("authenticatedUserId");
      if (id) {
        let userList = resultOfAction;
        if (userList.length > 0) {
          state.authenticatedUser = userList.find((user) => user.id === id);
          state.isAuthenticated = true;
        }
      }
    },
  },

  actions: {
    updateAuthenticatedAction(context) {
      localbase
        .collection("users")
        .get()
        .then((result) => {
          context.commit("updateAuthenticated", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
