import { defineStore } from 'pinia';
import { ref } from 'vue';
import localbase from '@/js/libs/localbase';

export const useTasksStore = defineStore('tasks', () => {
  const TASK_LIST = ref([]);

  function CREATE_TASK(payload) {
    TASK_LIST.value.push(payload);
  }

  function DELETE_TASK(payload) {
    let index = TASK_LIST.value.findIndex((task) => task.id === payload.id);
    TASK_LIST.value.splice(index, 1);
  }

  function EDIT_TASK(payload) {
    TASK_LIST.value = TASK_LIST.value.map((task) => {
      return task.id === payload.id ? payload : task;
    });
  }

  function COMPLETE_TASK(payload) {
    TASK_LIST.value.forEach((task) => {
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
  }

  async function INITIALIZE_TASK_LIST() {
    TASK_LIST.value ==
      (await localbase
        .collection('tasks')
        .get()
        .catch((error) => console.log(error)));
  }

  return {
    TASK_LIST,
    CREATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    COMPLETE_TASK,
    INITIALIZE_TASK_LIST,
  };
});
