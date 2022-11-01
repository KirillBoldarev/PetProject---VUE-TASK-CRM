export default {
  state: {
    taskList: [],
  },

  getters: {
    getTaskList(state) {
      return state.taskList;
    },
  },
  mutations: {
/*     updateTaskList(state, taskList) {
      state.taskList = taskList;
    }, */

    initializeTaskList(state) {
      let taskList = JSON.parse(localStorage.getItem("taskList"));
      if (!taskList) {
        state.taskList = [];
      } else {
        state.taskList = taskList;
      }
    },

    addTask(state, task) {
      state.taskList.push(task);
    },

    deleteTask(state, targetedTask) {
      let index;
      state.taskList.forEach((task, idx) => {
        if (task.id === targetedTask.id) {
          index = idx;
        }
      });
      state.taskList.splice(index, 1);
    },

    editTask(state, changedData) {
      state.taskList.forEach((task) => {
        if (task.id === changedData.id) {
          task.executorId = changedData.executorId;
          task.executorFullName = changedData.executorFullName;
          task.senderId = changedData.senderId;
          task.senderFullName = changedData.senderFullName;
          task.description = changedData.description;
          task.isCompleted = changedData.isCompleted;
        }
      });
    },

    completeTask(state, targetedTask) {
      state.taskList.forEach((task) => {
        if (task.id === targetedTask.id) {
          task.isCompleted = !task.isCompleted;
        }
      });
    },
  },

  actions: {},
};
