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
    updateTaskList(state, taskList) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
      state.taskList = taskList;
    },

    initializeTaskList(state) {
      let taskList = JSON.parse(localStorage.getItem("taskList"));
      if (!taskList) {
        state.taskList = [];
      } else {
        state.taskList = taskList;
      }
    },
  },
  actions: {},
};
