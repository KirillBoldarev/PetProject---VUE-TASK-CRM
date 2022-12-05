import { defineStore } from "pinia";
import localbase from "@/js/localbase";

export const useInspectedTaskStore = defineStore("inspectedTask", {
  state: () => ({
    INSPECTED_TASK: {},
  }),
  getters: {
    GET_INSPECTED_TASK(state) {
      return state.INSPECTED_TASK;
    },
  },
  actions: {
    INSPECT_TASK(payload) {
      state.INSPECTED_TASK = task;
      sessionStorage.setItem("inspectedTaskID", payload.id);
    },
    CLEAR_INSPECTED_TASK() {
      this.INSPECTED_TASK = null;
      sessionStorage.removeItem("inspectedTaskID");
    },
    UPDATE_INSPECTED_TASK(payload) {
      sessionStorage.setItem("inspectedTaskID", payload.id);
      this.INSPECTED_TASK = payload;
    },
    INITIALIZE_INSPECTED_TASK_ACTION() {
      localbase
        .collection("tasks")
        .get()
        .then((result) => {
          let inspected = sessionStorage.getItem("inspectedTaskID");
          if (inspected) {
            this.INSPECTED_TASK = result.find(
              (task) => task.id === inspected
            );
          }
        })
        .catch((error) => console.log(error));
    },
  },
});
