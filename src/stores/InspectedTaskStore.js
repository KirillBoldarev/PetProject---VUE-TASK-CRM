import { defineStore } from "pinia";
import localbase from "@/js/libs/localbase";

export const useInspectedTaskStore = defineStore("inspectedTask", {
  state: () => ({
    INSPECTED_TASK: null,
  }),
  getters: {
    GET_INSPECTED_TASK(state) {
      return state.INSPECTED_TASK;
    },
  },
  actions: {
    INSPECT_TASK(payload) {
      this.INSPECTED_TASK = payload;
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
    async INITIALIZE_INSPECTED_TASK() {
      let inspected = sessionStorage.getItem("inspectedTaskID");
      let taskList = await localbase.collection("tasks").get();
      if (inspected && taskList) {
        this.INSPECTED_TASK = taskList.find((task) => task.id === inspected);
      }
    },
  },
});
