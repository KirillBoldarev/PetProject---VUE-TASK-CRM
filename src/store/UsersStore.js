import { defineStore } from "pinia";
import localbase from "@/js/localbase";

export const useUsersStore = defineStore("users", {
  state: () => ({
    USER_LIST: [],
  }),
  getters: {
    GET_USER_LIST(state) {
      return state.USER_LIST;
    },
  },
  actions: {
    CREATE_USER(payload) {
      this.USER_LIST.push(payload);
    },
    DELETE_USER(payload) {
      let index;
      this.USER_LIST.forEach((user, idx) => {
        if (user.id === payload.id) {
          index = idx;
        }
      });
      this.USER_LIST.splice(index, 1);
    },
    EDIT_USER(payload) {
      this.USER_LIST = this.USER_LIST.map((user) => {
        return user.id === payload.id ? payload : user;
      });
    },
    INITIALIZE_USER_LIST_ACTION() {
      localbase
        .collection("users")
        .get()
        .then((result) => {
          this.USER_LIST = result;
        })
        .catch((error) => console.log(error));
    },
  },
});
