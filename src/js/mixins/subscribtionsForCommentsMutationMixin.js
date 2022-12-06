import localbase from "@/js/libs/localbase";

export default {
  data() {
    return {};
  },
  beforeMount() {
    const unsubscribeFromActionUponComments = this.commentsStore.$onAction(
      (action) => {
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
      }
    );
  },
  beforeUnmounted() {
    unsubscribeFromActionUponComments();
  },
};
