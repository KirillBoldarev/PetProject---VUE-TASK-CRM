import localbase from "@/js/localbase";

export default {
  state: {
    TASK_RELATIONS: [],
  },
  getters: {
    TASK_RELATIONS(state) {
      return state.TASK_RELATIONS;
    },
  },
  mutations: {
    BIND_TASK(state, data) {
      state.TASK_RELATIONS.push({
        task: data.id,
        sender: data.sender,
        executor: data.executor,
      });
    },

    REBIND_TASK(state, data) {
      state.TASK_RELATIONS.forEach((record) => {
        if (record.task === data.id) {
          record.sender = data.sender;
          record.executor = data.executor;
        }
      });
    },

    INITIALIZE_TASK_RELATIONS(state, resultOfAction) {
      state.TASK_RELATIONS = resultOfAction;
    },
  },
  actions: {
    INITIALIZE_TASK_RELATIONS_ACTION(context) {
      localbase
        .collection("task-relations")
        .get()
        .then((result) => {
          context.commit("INITIALIZE_TASK_RELATIONS", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
