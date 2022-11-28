import localbase from "@/js/localbase";

export default {
  data() {
    return {
      subscribtionsForCommentsMutations: null,
    };
  },
  beforeMount() {
    this.subscribtionsForCommentsMutations = this.$store.subscribe(
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
  },
  beforeUnmounted() {
    this.subscribtionsForCommentsMutations = null;
  },
};
