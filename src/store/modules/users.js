import localbase from "@/js/libs/localbase";

export default {
  state: {
    USER_LIST: [],
  },

  getters: {
    GET_USER_LIST(state) {
      return state.USER_LIST;
    },
  },
  mutations: {
    INITIALIZE_USER_LIST(state, resultFromAction) {
      state.USER_LIST = resultFromAction;
    },

    CREATE_USER(state, user) {
      state.USER_LIST.push(user);
    },

    DELETE_USER(state, targetedUser) {
      let index;
      state.USER_LIST.forEach((user, idx) => {
        if (user.id === targetedUser.id) {
          index = idx;
        }
      });
      state.USER_LIST.splice(index, 1);
    },

    EDIT_USER(state, changedData) {
      state.USER_LIST = state.USER_LIST.map((user) => {
        return user.id === changedData.id ? changedData : user;
      });
    },
  },
  actions: {
    INITIALIZE_USER_LIST_ACTION(context) {
      localbase
        .collection("users")
        .get()
        .then((result) => {
          context.commit("INITIALIZE_USER_LIST", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
