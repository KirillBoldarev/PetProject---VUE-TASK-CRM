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
    updateUserList(state, userList) {
      localStorage.setItem("userList", JSON.stringify(userList));
      state.userList = userList;
    },

    initializeUserList(state) {
      let userList = JSON.parse(localStorage.getItem("userList"));
      if (!userList) {
        state.userList = [];
      } else {
        state.userList = userList;
      }
    },
  },
  actions: {},
};
