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
    TASK_EXECUTORS(state) {
      return state.TASK_EXECUTORS;
    },
  },
  mutations: {
    bindTask(state, data) {
      state.TASK_SENDERS.push({
        task: data.id,
        sender: data.sender,
      });
      state.TASK_EXECUTORS.push({
        task: data.id,
        executor: data.executor,
      });
    },

    rebindTask(state, data) {
      state.TASK_SENDERS.forEach((record) => {
        if (record.task === data.id) {
          record.sender = data.sender;
        }
      });

      state.TASK_EXECUTORS.forEach((record) => {
        if (record.task === data.id) {
          record.executor = data.executor;
        }
      });
    },

    initialize_TASK_SENDERS(state, resultOfAction) {
      state.TASK_SENDERS = resultOfAction;
    },

    initialize_TASK_EXECUTORS(state, resultOfAction) {
      state.TASK_EXECUTORS = resultOfAction;
    },
  },
  actions: {
    initialize_TASK_SENDERS_ACTION(context) {
      localbase
        .collection("task-senders")
        .get()
        .then((result) => {
          context.commit("initialize_TASK_SENDERS", result);
        })
        .catch((error) => console.log(error));
    },

    initialize_TASK_EXECUTORS_ACTION(context) {
      localbase
        .collection("task-executors")
        .get()
        .then((result) => {
          context.commit("initialize_TASK_EXECUTORS", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
