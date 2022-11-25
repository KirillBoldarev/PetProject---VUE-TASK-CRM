import filterDate from "@/js/filterDate";
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
    initializeTaskList(state, resultFromAction) {
      state.taskList = resultFromAction;
    },

    createTask(state, task) {
      state.taskList.push(task);
    },

    deleteTask(state, target) {
      let index;
      state.taskList.forEach((task, idx) => {
        if (task.id === target.id) {
          index = idx;
        }
      });
      state.taskList.splice(index, 1);
    },

    editTask(state, changedData) {
      state.taskList.forEach((task) => {
        if (task.id === changedData.id) {
          task.title = changedData.title;
          task.commits = changedData.commits;
          task.description = changedData.description;
          task.isCompleted = changedData.isCompleted;
        }
      });
    },

    completeTask(state, targetedTask) {
      state.taskList.forEach((task) => {
        if (task.id === targetedTask.id) {
          if (task.isCompleted === true) {
            task.isCompleted = !targetedTask.isCompleted;
            delete task.dateOfCompletion;
            return;
          }
          if (task.isCompleted === false) {
            task.isCompleted = !targetedTask.isCompleted;
            task.dateOfCompletion = filterDate(new Date(), "datetime");
            return;
          }
        }
      });
    },
  },

  actions: {
    initializeTaskListAction(context) {
      localbase
        .collection("tasks")
        .get()
        .then((result) => {
          context.commit("initializeTaskList", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
