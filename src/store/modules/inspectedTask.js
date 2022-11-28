export default {
  state: {
    INSPECTED_TASK: {},
  },
  getters: {
    GET_INSPECTED_TASK(state) {
      return state.INSPECTED_TASK;
    },
  },
  mutations: {
    INSPECT_TASK(state, task) {
      state.INSPECTED_TASK = task;
      sessionStorage.setItem("inspectedTask", JSON.stringify(task));
    },

    CLEAR_INSPECTED_TASK(state) {
      state.INSPECTED_TASK = null;
      sessionStorage.removeItem("inspectedTask");
    },
    INITIALIZE_INSPECTED_TASK(state) {
      let inspected = JSON.parse(sessionStorage.getItem("inspectedTask"));
      if (inspected) {
        state.INSPECTED_TASK = inspected;
      }
    },
    UPDATE_INSPECTED_TASK(state, task) {
      sessionStorage.setItem("inspectedTask", JSON.stringify(task));
      state.INSPECTED_TASK = task;
    },
  },
};
