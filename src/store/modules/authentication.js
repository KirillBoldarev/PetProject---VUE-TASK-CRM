import localbase from "@/js/libs/localbase";

export default {
  state: {
    AUTHENTICATED: {},
    IS_AUTHENTICATED: false,
  },
  getters: {
    IS_AUTH(state) {
      return state.IS_AUTHENTICATED;
    },
    GET_AUTH(state) {
      return state.AUTHENTICATED;
    },
  },
  mutations: {
    AUTHENTICATION(state, user) {
      state.AUTHENTICATED = user;
      state.IS_AUTHENTICATED = true;
      sessionStorage.setItem("authID", state.AUTHENTICATED.id);
    },

    LOGOUT(state) {
      state.IS_AUTHENTICATED = false;
      state.AUTHENTICATED = {};
      sessionStorage.removeItem("authID");
    },

    UPDATE_AUTHENTICATED(state, resultOfAction) {
      let id = sessionStorage.getItem("authID");
      if (id) {
        if (Array.isArray(resultOfAction)) {
          state.AUTHENTICATED = resultOfAction.find((user) => user.id === id);
          state.IS_AUTHENTICATED = true;
        }
        if (!Array.isArray(resultOfAction)) {
          state.IS_AUTHENTICATED = true;
          state.AUTHENTICATED = resultOfAction;
        }
      }
    },
  },

  actions: {
    UPDATE_AUTHENTICATED_ACTION(context) {
      localbase
        .collection("users")
        .get()
        .then((result) => {
          context.commit("UPDATE_AUTHENTICATED", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
