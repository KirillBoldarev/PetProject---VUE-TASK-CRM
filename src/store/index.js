import { createStore } from "vuex";
import authenticate from "./modules/authenticate";

export default createStore({
  /*  state: {
    authenticatedUser: {},
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    authenticateCurrentUser() {
      this.state.isAuthenticated = true;
      console.log("state.isAuthenticated", this.state.isAuthenticated);
    },
    info() {
      console.log("СРАБОТАЛА МУТАЦИЯ В СТОРЕ");
    },
  },
  actions: {}, */
  modules: { authenticate },
});
