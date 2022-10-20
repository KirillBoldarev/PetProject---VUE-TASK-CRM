export default {
  state: {
    userList: [],
  },

  getters: {

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
