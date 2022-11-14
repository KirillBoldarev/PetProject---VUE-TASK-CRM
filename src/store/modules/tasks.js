import localbase from "@/js/localbase";

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
    initializeTaskList(state) {
      let taskList = JSON.parse(localStorage.getItem("taskList"));
      if (!taskList) {
        state.taskList = [];
      } else {
        state.taskList = taskList;
      }
    },

    createTask(state, task) {
      localbase.collection("tasks").add(task);
      state.taskList.push(task);
    },

    bindTask(state, data) {
      localbase.collection("task-senders").add({
        task: data.id,
        sender: data.sender,
      });
      localbase.collection("task-executors").add({
        task: data.id,
        executor: data.executor,
      });
    },

    deleteTask(state, target) {
      localbase.collection("tasks").doc({ id: target.id }).delete();
      localbase
        .collection("task-senders")
        .doc({ id: target.id })
        .delete();
      localbase
        .collection("task-executors")
        .doc({ id: target.id })
        .delete();
      
      let index;
      state.taskList.forEach((task, idx) => {
        if (task.id === target.id) {
          index = idx;
        }
      });
      state.taskList.splice(index, 1);
    },

    editTask(state, changedData) {
      localbase
        .collection("tasks")
        .doc({ id: changedData.id })
        .set(changedData);

      state.taskList.forEach((task) => {
        if (task.id === changedData.id) {
          task = changedData;
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
