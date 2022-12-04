export default {
  state: {
    IS_MOBILE: false,
    IS_DESKTOP: false,
  },
  getters: {
    IS_MOBILE(state) {
      return state.IS_MOBILE;
    },
    IS_DESKTOP(state) {
      return state.IS_DESKTOP;
    },
  },
  mutations: {
    SET_MOBILE(state) {
      state.IS_MOBILE = true;
      state.IS_DESKTOP = false;
    },
    SET_DESKTOP(state) {
      state.IS_DESKTOP = true;
      state.IS_MOBILE = false;
    },
  },
  actions: {
    SET_MOBILE_ACTION(context) {
      context.commit("SET_MOBILE");
    },
    SET_DESKTOP_ACTION(context) {
      context.commit("SET_DESKTOP");
    },
  },
};
