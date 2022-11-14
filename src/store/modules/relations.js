import localbase from "@/js/localbase";

export default {
  state: {
    TASK_SENDERS: [],
    TASK_EXECUTORS: [],
  },
  getters: {
    TASK_SENDERS(state) {
      return state.TASK_SENDERS;
    },
  },
  mutations: {
    initialize_TASK_SENDERS(state) {
      localbase
        .collection("task-senders")
        .get()
        .then((result) => {
          if (result.length < 1) {
            state.TASK_SENDERS = [];
          } else {
            state.TASK_SENDERS = result;
          }
        });
    },
  },
  actions: {},
};
