import filterDate from "@/js/filterDate";
import localbase from "@/js/localbase";

export default {
  state: {
    TASK_LIST: [],
  },

  getters: {
    GET_TASK_LIST(state) {
      return state.TASK_LIST;
    },
  },
  mutations: {
    INITIALIZE_TASK_LIST(state, resultFromAction) {
      state.TASK_LIST = resultFromAction;
    },

    CREATE_TASK(state, task) {
      state.TASK_LIST.push(task);
    },

    DELETE_TASK(state, target) {
      let index;
      state.TASK_LIST.forEach((task, idx) => {
        if (task.id === target.id) {
          index = idx;
        }
      });
      state.TASK_LIST.splice(index, 1);
    },

    EDIT_TASK(state, changedData) {
      state.TASK_LIST = state.TASK_LIST.map((task) => {
        return task.id === changedData.id ? changedData : task;
      });
    },

    COMPLETE_TASK(state, targetedTask) {
      state.TASK_LIST.forEach((task) => {
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
    INITIALIZE_TASK_LIST_ACTION(context) {
      localbase
        .collection("tasks")
        .get()
        .then((result) => {
          context.commit("INITIALIZE_TASK_LIST", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
