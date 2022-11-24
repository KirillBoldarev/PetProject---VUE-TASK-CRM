import localbase from "@/js/localbase";

export default {
  state: {
    authenticated: {},
    isAuthenticated: false,
  },
  getters: {
    isAuth(state) {
      return state.isAuthenticated;
    },
    getAuth(state) {
      return state.authenticated;
    },
  },
  mutations: {
    authentication(state, user) {
      state.authenticated = user;
      state.isAuthenticated = true;
      sessionStorage.setItem("getAuthId", state.authenticated.id);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.authenticated = {};
      sessionStorage.removeItem("getAuthId");
    },

    updateAuthenticated(state, resultOfAction) {
      let id = sessionStorage.getItem("getAuthId");
      if (id) {
        if (Array.isArray(resultOfAction)) {
          state.authenticated = resultOfAction.find((user) => user.id === id);
          state.isAuthenticated = true;
        }
        if (!Array.isArray(resultOfAction)) {
          state.isAuthenticated = true;
          state.authenticated = resultOfAction;
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
