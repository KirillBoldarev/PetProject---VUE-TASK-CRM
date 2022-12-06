import localbase from "@/js/libs/localbase";
export default {
  state: {
    COMMENTS: [],
  },
  getters: {
    GET_COMMENTS(state) {
      return state.COMMENTS;
    },
  },
  mutations: {
    CREATE_COMMENT(state, comment) {
      state.COMMENTS.push(comment);
    },
    DELETE_COMMENT(state, target) {
      let index;
      state.COMMENTS.forEach((comment, idx) => {
        if (comment.id === target.id) {
          index = idx;
        }
      });
      state.COMMENTS.splice(index, 1);
    },
    EDIT_COMMENT(state, changedData) {
      state.COMMENTS = state.COMMENTS.map((comment) => {
        return comment.id === changedData.id ? changedData : comment;
      });
    },
    INITIALIZE_COMMENTS(state, resultOfAction) {
      state.COMMENTS = resultOfAction;
    },
    CLEAR_COMMENTS(state) {
      state.COMMENTS = [];
    },
  },
  actions: {
    INITIALIZE_COMMENTS_ACTION(context, taskId) {
      localbase
        .collection("comments")
        .get()
        .then((result) => {
          let specificComments = result.filter(
            (comment) => comment.task === taskId
          );
          context.commit("INITIALIZE_COMMENTS", specificComments);
        })
        .catch((error) => console.log(error));
    },
  },
};
