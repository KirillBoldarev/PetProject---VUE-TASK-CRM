
export default {
  state: {
    inspectedTask: {},
  },
  getters: {
    getInspectedTask(state) {
      return state.inspectedTask;
    },
  },
  mutations: {
    inspectTask(state, task) {
      state.inspectedTask = task;
      sessionStorage.setItem("inspectedTask", JSON.stringify(task));
    },

    clearInspectedTask(state) {
      state.inspectedTask = null;
      sessionStorage.removeItem("inspectedTask");
    },
    initializeInspectedTask(state) {
      let inspected = JSON.parse(sessionStorage.getItem("inspectedTask"));
      if (inspected) {
        state.inspectedTask = inspected;
      }
     },
     updateInspectedTask(state, task) { 
        sessionStorage.setItem("inspectedTask", JSON.stringify(task));
        state.inspectedTask = task;
     }
  },
};
