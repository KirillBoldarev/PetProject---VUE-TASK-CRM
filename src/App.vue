<template>
  <div class="container">
    <header-layout :taskList="taskList"></header-layout>
    <div>{{ taskList }}</div>
    <main class="main"><router-view :taskList="taskList"></router-view></main>
    <footer-layout :taskList="taskList"></footer-layout>
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
    };
  },
  methods: {},

  computed: {
    userList() {
      return JSON.parse(localStorage.getItem("userList"));
    },
  },
  created() {
    this.$store.subscribe((mutations , state) => {
      if ((mutations.type === 'initializeTaskList'))
      this.taskList = state.tasks.taskList;
    });



    this.$store.commit("updateAuthUser");
    this.$store.commit("updateUserList");
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
