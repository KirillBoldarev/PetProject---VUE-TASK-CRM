import { defineStore } from "pinia";


export const useScreenResolutionStore = defineStore("screenResolution", {
  state: () => ({
    IS_MOBILE: false,
    IS_DESKTOP: false,
  }),
  getters: {
    IS_MOBILE(state) {
      return state.IS_MOBILE;
    },
    IS_DESKTOP(state) {
      return state.IS_DESKTOP;
    },
  },
  actions: {
    SET_MOBILE() {
      this.IS_MOBILE = true;
      this.IS_DESKTOP = false;
    },
    SET_DESKTOP() {
      this.IS_DESKTOP = true;
      this.IS_MOBILE = false;
    },
  },
});
