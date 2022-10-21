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
    updateUserList(state) {
      let userList = JSON.parse(localStorage.getItem("userList"));
      if (userList) {
        state.userList = userList;
      }
    },
  },
  actions: {},
};
