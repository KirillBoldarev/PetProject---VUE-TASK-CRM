import localbase from "@/js/localbase";

export default {
  data() {
    return {
      subscribtionsForUsersMutations: null,
    };
  },
  beforeMount() {
    this.subscribtionsForUsersMutations = this.$store.subscribe(
      (mutation, state) => {
        //Initialize
        if (mutation.type === "INITIALIZE_USER_LIST") {
          this.userList = this.$store.getters.GET_USER_LIST;
        }
        //Create
        if (mutation.type === "CREATE_USER") {
          localbase
            .collection("users")
            .add(mutation.payload)
            .catch((error) => console.log(error));
        }
        //Delete
        if (mutation.type === "DELETE_USER") {
          localbase
            .collection("users")
            .doc({ id: mutation.payload.id })
            .delete()
            .catch((error) => console.log(error));
        }
        //Edit
        if (mutation.type === "EDIT_USER") {
          localbase
            .collection("users")
            .doc({ id: mutation.payload.id })
            .set(mutation.payload)
            .then((result) => {
              this.userList = this.userList.map((user) => {
                return user.id === mutation.payload.id
                  ? mutation.payload
                  : user;
              });
              if (mutation.payload.id === this.$store.getters.GET_AUTH.id) {
                this.$store.commit("UPDATE_AUTHENTICATED", mutation.payload);
              }
            })
            .catch((error) => console.log(error));
        }
      }
    );
  },
  beforeUnmounted() {
    this.subscribtionsForUsersMutations = null;
  },
};
