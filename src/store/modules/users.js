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
      state.userList.forEach((user) => {
        if (user.id === changedData.id) {
          user.firstName = changedData.firstName;
          user.secondName = changedData.secondName;
          user.email = changedData.email;
          user.phone = changedData.phone;
          user.password = changedData.password;
          user.role = changedData.role;
        }
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
