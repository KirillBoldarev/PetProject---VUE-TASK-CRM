import { defineStore } from "pinia";
import localbase from "@/js/localbase";

export const useAuthenticatedStore = defineStore("authenticated", {
  state: () => ({
    AUTHENTICATED: {},
    IS_AUTHENTICATED: false,
  }),
  getters: {
    IS_AUTH(state) {
      return state.IS_AUTH;
    },
    AUTHENTICATED(state) {
      return state.AUTHENTICATED;
    },
  },
  actions: {
    AUTHENTICATION(user) {
      this.AUTHENTICATED = user;
      this.IS_AUTHENTICATED = true;
      sessionStorage.setItem("authID", this.AUTHENTICATED.id);
    },
    LOGOUT() {
      this.IS_AUTHENTICATED = false;
      this.AUTHENTICATED = {};
      sessionStorage.removeItem("authID");
    },

    UPDATE_AUTHENTICATED() {
      localbase
        .collection("users")
        .get()
        .then((result) => {
          let id = sessionStorage.getItem("authID");
          if (Array.isArray(result)) {
            this.AUTHENTICATED = result.find((user) => user.id === id);
            this.IS_AUTHENTICATED = true;
          }
          if (!Array.isArray(result)) {
            this.IS_AUTHENTICATED = true;
            this.AUTHENTICATED = result;
          }
        })
        .catch((error) => console.log(error));
    },
  },
});
