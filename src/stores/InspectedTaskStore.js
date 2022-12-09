import { defineStore } from 'pinia';
import localbase from '@/js/libs/localbase';

export const useInspectedTaskStore = defineStore('inspectedTask', {
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
      sessionStorage.setItem('inspectedTaskID', payload.id);
    },
    CLEAR_INSPECTED_TASK() {
      this.INSPECTED_TASK = null;
      sessionStorage.removeItem('inspectedTaskID');
    },
    EDIT_INSPECTED_TASK(payload) {
      sessionStorage.setItem('inspectedTaskID', payload.id);
      this.INSPECTED_TASK = payload;
    },
    COMPLETE_INSPECTED_TASK() {
      if (this.INSPECTED_TASK && this.INSPECTED_TASK.isCompleted) {
        this.INSPECTED_TASK.isCompleted = !this.INSPECTED_TASK.isCompleted;
        delete this.INSPECTED_TASK.dateOfCompletion;
        return;
      }
      if (this.INSPECTED_TASK && !this.INSPECTED_TASK.isCompleted) {
        this.INSPECTED_TASK.isCompleted = !this.INSPECTED_TASK.isCompleted;
        this.INSPECTED_TASK.dateOfCompletion = new Date();
      }
    },
    async INITIALIZE_INSPECTED_TASK() {
      const inspected = sessionStorage.getItem('inspectedTaskID');
      const taskList = await localbase.collection('tasks').get();
      if (inspected && taskList) {
        this.INSPECTED_TASK = taskList.find((task) => task.id === inspected);
        return;
      }
      return;
    },
  },
});
