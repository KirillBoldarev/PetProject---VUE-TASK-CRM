import { defineStore } from "pinia";
import localbase from "@/js/localbase";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    TASK_LIST: [],
  }),
  getters: {
    GET_TASK_LIST(state) {
      return state.TASK_LIST;
    },
  },
  actions: {
    INITIALIZE_TASK_LIST() {
      localbase
        .collection("tasks")
        .get()
        .then((result) => {
          this.TASK_LIST = result;
        })
        .catch((error) => console.log(error));
    },
    CREATE_TASK(payload) {
      this.TASK_LIST.push(payload);
    },
    DELETE_TASK(payload) {
      let index;
      this.TASK_LIST.forEach((task, idx) => {
        if (task.id === payload.id) {
          index = idx;
        }
      });
      this.TASK_LIST.splice(index, 1);
    },
    EDIT_TASK(payload) {
      this.TASK_LIST = this.TASK_LIST.map((task) => {
        return task.id === payload.id ? payload : task;
      });
    },
    COMPLETE_TASK(payload) {
      this.TASK_LIST.forEach((task) => {
        if (task.id === payload.id) {
          if (task.isCompleted === true) {
            task.isCompleted = !payload.isCompleted;
            delete task.dateOfCompletion;
            return;
          }
          if (task.isCompleted === false) {
            task.isCompleted = !payload.isCompleted;
            task.dateOfCompletion = new Date();
            return;
          }
        }
      });
    },
  },
});
