import localbase from "../localbase";

export default {
  data() {
    return {
      subscribtionsForFilesMutations: null,
    };
  },

  mounted() {
    this.subscribtionsForFilesMutations = this.$store.subscribe(
      (mutation, state) => {
        //Add
        if (mutation.type === "addFile") {
          localbase.collection("files").add(mutation.payload);
        }
        //Delete
        if (mutation.type === "deleteFile") {
          localbase
            .collection("files")
            .doc({ id: mutation.payload.id })
            .delete();
        }
      }
    );

    this.$store.dispatch("initializeFileListAction");
  },

  beforeUnmount() {
    this.subscribtionsForFilesMutations = null;
  },
};
