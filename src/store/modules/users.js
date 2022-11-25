import localbase from "@/js/localbase";

export default {
  state: {
    userList: [],
  },

  getters: {
    getUserList(state) {
      return state.userList;
    },
  },
  mutations: {
    initializeUserList(state, resultFromAction) {
      state.userList = resultFromAction;
    },

    createUser(state, user) {
      state.userList.push(user);
    },

    deleteUser(state, targetedUser) {
      let index;
      state.userList.forEach((user, idx) => {
        if (user.id === targetedUser.id) {
          index = idx;
        }
      });
      state.userList.splice(index, 1);
    },

    editUser(state, changedData) {
      state.userList = state.userList.map((user) => {
        return user.id === changedData.id ? changedData : user;
      });
    },
  },
  actions: {
    initializeUserListAction(context) {
      localbase
        .collection("users")
        .get()
        .then((result) => {
          context.commit("initializeUserList", result);
        })
        .catch((error) => console.log(error));
    },
  },
};
