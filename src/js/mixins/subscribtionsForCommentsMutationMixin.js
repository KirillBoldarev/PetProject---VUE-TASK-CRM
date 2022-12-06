import localbase from "@/js/libs/localbase";

export default {
  data() {
    return {
      /* subscribtionsForCommentsMutations: null, */
      subscribtionsForActionsUponComments: null,
    };
  },
  beforeMount() {
/*     this.subscribtionsForCommentsMutations = this.$store.subscribe(
      (mutation, state) => {
        //Create
        if (mutation.type === "CREATE_COMMENT") {
          localbase
            .collection("comments")
            .add(mutation.payload)
            .catch((error) => console.log(error));
        }
        //Delete
        if (mutation.type === "DELETE_COMMENT") {
          localbase
            .collection("comments")
            .doc({ id: mutation.payload.id })
            .delete()
            .catch((error) => console.log(error));
        }
        //Edit
        if (mutation.type === "EDIT_COMMENT") {
          localbase
            .collection("comments")
            .doc({ id: mutation.payload.id })
            .set(mutation.payload)
            .catch((error) => console.log(error));
        }
      }
    );
 */
    this.subscribtionsForActionsUponComments = this.commentsStore.$onAction((action) => {
      //Create
      if (action.name === "CREATE_COMMENT") {
        localbase
          .collection("comments")
          .add(action.args[0])
          .catch((error) => console.log(error));
      }
      //Delete
      if (action.name === "DELETE_COMMENT") {
        localbase
          .collection("comments")
          .doc({ id: action.args[0].id })
          .delete()
          .catch((error) => console.log(error));
      }
      //Edit
      if (action.name === "EDIT_COMMENT") {
        localbase
          .collection("comments")
          .doc({ id: action.args[0].id })
          .set(action.args[0])
          .catch((error) => console.log(error));
      }
    })
  },
  beforeUnmounted() {
    /* this.subscribtionsForCommentsMutations = null; */
    this.subscribtionsForActionsUponComments = null;
  },
};
