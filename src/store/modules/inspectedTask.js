import filterDate from "@/js/filterDate";
import localbase from "@/js/localbase";

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
    initializeInspectedTask(state, resultOfAction) {
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
  actions: {
    initializeInspectedTaskAction(context) {
      localbase
        .collection("tasks")
        .get()
        .then((result) => {
          context.commit("initializeInspectedTask", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
