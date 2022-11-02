<template>
  <div class="main main__container">
    <header-layout :taskList="taskList" :userList="userList"></header-layout>
    <main>
      <router-view :taskList="taskList" :userList="userList"></router-view>
    </main>
    <footer-layout :taskList="taskList" :userList="userList"></footer-layout>
  </div>
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
