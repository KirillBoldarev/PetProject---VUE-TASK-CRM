import localbase from "@/js/libs/localbase";


export default {
  data() {
    return {
      /* subscribtionsForUsersMutations: null, */
      subscribtionsForActionsUponUsers: null,
    };
  },
  beforeMount() {
    /* this.subscribtionsForUsersMutations = this.$store.subscribe((mutation) => {
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
              return user.id === mutation.payload.id ? mutation.payload : user;
            });
            if (mutation.payload.id === this.$store.getters.GET_AUTH.id) {
              this.$store.commit("UPDATE_AUTHENTICATED", mutation.payload);
            }
          })
          .catch((error) => console.log(error));
      }
    }); */

    this.subscribtionsForActionsUponUsers = this.usersStore.$onAction(
      (action) => {
        // CREATE
        if (action.name === "CREATE_USER") {
          localbase
            .collection("users")
            .add(action.args[0])
            .catch((error) => console.log(error));
        }
        //DELETE
        if (action.name === "DELETE_USER") {
          localbase
            .collection("users")
            .doc({ id: action.args[0].id })
            .delete()
            .catch((error) => console.log(error));
        }
        //EDIT
        if (action.name === "EDIT_USER") {
          localbase
            .collection("users")
            .doc({ id: action.args[0].id })
            .set(action.args[0])
            .then((result) => {
              this.userList = this.userList.map((user) => {
                return user.id === action.args[0].id ? action.args[0] : user;
              });
              if (action.args[0].id === this.authenticatedStore.GET_AUTH.id) {
                this.authenticatedStore.UPDATE_AUTHENTICATED();
              }
            })
            .catch((error) => console.log(error));
        }
        //INITIALIZE
        if (action.name === "INITIALIZE_USER_LIST") {
          action.after(() => {
            this.userList = this.usersStore.GET_USER_LIST;
          });
        }
      }
    );
  },
  beforeUnmounted() {
    /* this.subscribtionsForUsersMutations = null; */
    this.subscribtionsForActionsUponUsers = null;
  },
};
