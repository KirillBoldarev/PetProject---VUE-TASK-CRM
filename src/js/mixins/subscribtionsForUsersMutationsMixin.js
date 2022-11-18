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
          localbase
            .collection("users")
            .add(mutation.payload)
            .catch((error) => console.log(error));
        }
        //Delete
        if (mutation.type === "deleteUser") {
          localbase
            .collection("users")
            .doc({ id: mutation.payload.id })
            .delete()
            .catch((error) => console.log(error));
        }
        //Edit
        if (mutation.type === "editUser") {
          localbase
            .collection("users")
            .doc({ id: mutation.payload.id })
            .set(mutation.payload)
            .catch((error) => console.log(error));
        }
      }
    );
        this.$store.dispatch("initializeUserListAction");
  },
  beforeUnmounted() {
    this.subscribtionsForUsersMutations = null;
  },
};
