import { defineStore } from 'pinia';
import { ref } from 'vue';
import localbase from '@/js/libs/localbase';

export const useInspectedTaskStore = defineStore('inspectedTask', () => {
  const INSPECTED_TASK = ref();

  function INSPECT_TASK(payload) {
    INSPECTED_TASK.value = payload;
    sessionStorage.setItem('inspectedTaskID', payload.id);
  }

  function CLEAR_INSPECTED_TASK() {
    INSPECTED_TASK.value = null;
    sessionStorage.removeItem('inspectedTaskID');
  }

  function EDIT_INSPECTED_TASK(payload) {
    sessionStorage.setItem('inspectedTaskID', payload.id);
    INSPECTED_TASK.value = payload;
  }

  function UPDATE_INSPECTED_TASK(task) {
    INSPECTED_TASK.value = task;
  }

  async function INITIALIZE_INSPECTED_TASK() {
    let inspected = sessionStorage.getItem('inspectedTaskID');
    let taskList = await localbase.collection('tasks').get();
    if (inspected && taskList) {
      INSPECTED_TASK.value = taskList.find((task) => task.id === inspected);
      return;
    }
    return;
  }

  return {
    INSPECTED_TASK,
    INSPECT_TASK,
    EDIT_INSPECTED_TASK,
    INITIALIZE_INSPECTED_TASK,
    CLEAR_INSPECTED_TASK,
    UPDATE_INSPECTED_TASK,
  };
});
