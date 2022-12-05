import { defineStore } from "pinia";
import localbase from "@/js/localbase";

export const useCommentsStore = defineStore("comments", {
  state: () => ({
    COMMENTS: [],
  }),
  getters: {
    GET_COMMENTS(state) {
      return state.COMMENTS;
    },
  },
  actions: {
    CREATE_COMMENT(payload) {
      this.COMMENTS.push(payload);
    },
    DELETE_COMMENT(payload) {
      let index;
      this.COMMENTS.forEach((comment, idx) => {
        if (comment.id === payload.id) {
          index = idx;
        }
      });
      this.COMMENTS.splice(index, 1);
    },
    EDIT_COMMENT(payload) {
      this.COMMENTS = this.COMMENTS.map((comment) => {
        return comment.id === payload.id ? payload : comment;
      });
    },
    INITIALIZE_COMMENTS(taskId) {
      localbase
        .collection("comments")
        .get()
        .then((result) => {
          let filteredComments = result.filter(
            (comment) => comment.task === taskId
          );
          this.COMMENTS = filteredComments;
        })
        .catch((error) => console.log(error));
    },
  },
});
