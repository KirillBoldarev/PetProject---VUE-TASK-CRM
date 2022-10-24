<template>
  <div class="container">
    <header-layout :taskList="taskList" :userList="userList"></header-layout>
    <main class="main">
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

  computed: {
    /* userList() {
      return JSON.parse(localStorage.getItem("userList"));
    }, */
  },
  created() {
    this.$store.subscribe((mutations, state) => {
      if (mutations.type === "initializeTaskList") {
        this.taskList = state.tasks.taskList;
      }
      if ((mutations.type = "initializeUserList")) {
        this.userList = state.users.userList;
      }
    });

    this.$store.commit("updateAuthUser");
    this.$store.commit("initializeUserList");
    this.$store.commit("initializeTaskList");
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 5px;
  min-height: 100%;
  height: 100%;
}

.main {
  padding: 5px;
  overflow-y: auto;
}
</style>
