export default {
  state: {
    taskList: [],
  },

   getters: {
      getTaskList(state) { 
         return state.taskList
      }
  },
  mutations: {
    updateTaskList(state) {
      let taskList = JSON.parse(localStorage.getItem("taskList"));
      if (taskList) {
        state.taskList = taskList;
      }
    },
  },
  actions: {},
};
