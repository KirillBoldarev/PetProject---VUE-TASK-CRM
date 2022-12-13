import { defineStore } from 'pinia';
import localbase from '@/js/libs/localbase';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    TASK_LIST: [],
  }),
  getters: {
    GET_TASK_LIST(state) {
      return state.TASK_LIST;
    },
  },
  actions: {
    async INITIALIZE_TASK_LIST() {
      this.TASK_LIST = await localbase
        .collection('tasks')
        .get()
        .catch((error) => console.log(error));
    },
    CREATE_TASK(payload) {
      this.TASK_LIST.push(payload);
    },
    DELETE_TASK(payload) {
      let index = this.TASK_LIST.findIndex((task) => task.id === payload.id);
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
          if (task.isCompleted) {
            task.isCompleted = !payload.isCompleted;
            delete task.dateOfCompletion;
            return;
          }
          if (!task.isCompleted) {
            task.isCompleted = !payload.isCompleted;
            task.dateOfCompletion = new Date();
          }
        }
      });
    },
  },
});
