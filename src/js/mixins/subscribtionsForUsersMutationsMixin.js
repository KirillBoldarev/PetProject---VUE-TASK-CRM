import localbase from "@/js/localbase";

export default {
  data() {
    return {
      subscribtionsForUsersMutations: null,
    };
  },
  mounted() {
    this.subscribtionsForUsersMutations = this.$store.subscribe(
      (mutation, state) => {
        //Initialize
        if (mutation.type === "initializeUserList") {
          this.userList = this.$store.getters.getUserList;
        }
        //Create
        if (mutation.type === "createUser") {
          localbase.collection("users").add(mutation.payload);
        }
        //Delete
        if (mutation.type === "deleteUser") {
          localbase
            .collection("users")
            .doc({ id: mutation.payload.id })
            .delete();
        }
        //Edit
        if (mutation.type === "editUser") {
          localbase
            .collection("users")
            .doc({ id: mutation.payload.id })
            .set(mutation.payload);
        }
      }
    );
        this.$store.dispatch("initializeUserListAction");
  },
  beforeUnmounted() {
    this.subscribtionsForUsersMutations = null;
  },
};
