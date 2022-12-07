import { defineStore } from "pinia";


export const useScreenResolutionStore = defineStore("screenResolution", {
  state: () => ({
    MOBILE: false,
    DESKTOP: false,
  }),
  getters: {
    IS_MOBILE(state) {
      return state.MOBILE;
    },
    IS_DESKTOP(state) {
      return state.DESKTOP;
    },
  },
  actions: {
    SET_MOBILE() {
      this.MOBILE = true;
      this.DESKTOP = false;
    },
    SET_DESKTOP() {
      this.DESKTOP = true;
      this.MOBILE = false;
    },
  },
});
