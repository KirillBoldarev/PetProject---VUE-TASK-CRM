import localbase from "@/js/localbase";

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
      sessionStorage.setItem("inspectedTaskID", task.id);
    },

    CLEAR_INSPECTED_TASK(state) {
      state.INSPECTED_TASK = null;
      sessionStorage.removeItem("inspectedTaskID");
    },
    INITIALIZE_INSPECTED_TASK(state, resultFromAction) {
      let inspected = sessionStorage.getItem("inspectedTaskID");
      if (inspected) {
        state.INSPECTED_TASK = resultFromAction.find(
          (task) => task.id === inspected
        );
      }
    },
    UPDATE_INSPECTED_TASK(state, task) {
      sessionStorage.setItem("inspectedTaskID", task.id);
      state.INSPECTED_TASK = task;
    },
  },
  actions: {
    INITIALIZE_INSPECTED_TASK_ACTION(context) {
      localbase
        .collection("tasks")
        .get()
        .then((result) => {
          context.commit("INITIALIZE_INSPECTED_TASK", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
