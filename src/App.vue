<template>
  <header-layout
    class="main__header"
    :taskList="taskList"
    :userList="userList"
  ></header-layout>

  <main class="main__content">
    <router-view :taskList="taskList" :userList="userList"></router-view>
  </main>

  <footer-layout class="main__footer"></footer-layout>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
import FooterLayout from "./layouts/FooterLayout.vue";

export default {
  components: { HeaderLayout, FooterLayout },

  data() {
    return {
      taskList: [],
      userList: [],
      visibleLeft: false,
    };
  },
  methods: {},

  computed: {},

  created() {
    this.$store.subscribe((mutations, state) => {
      if (mutations.type.includes("Task")) {
        localStorage.setItem("taskList", JSON.stringify(state.tasks.taskList));
        this.taskList = state.tasks.taskList;
      }
      if (mutations.type.includes("User")) {
        localStorage.setItem("userList", JSON.stringify(state.users.userList));
        this.userList = state.users.userList;
      }
    });
    this.$store.commit("initializeUserList");
    this.$store.commit("initializeTaskList");
    this.$store.commit("updateAuthenticated");
  },
};
</script>
