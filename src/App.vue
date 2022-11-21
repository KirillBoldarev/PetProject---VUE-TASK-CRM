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

import usersMutations from "./js/mixins/subscribtionsForUsersMutationsMixin";
import tasksMutations from "./js/mixins/subscribtionsForTasksMutationsMixin";

export default {
  components: { HeaderLayout, FooterLayout },
  mixins: [usersMutations, tasksMutations],
  data() {
    return {
      taskList: [],
      userList: [],
    };
  },
  methods: {},

  computed: {},

  mounted() {
    this.$store.dispatch("initialize_TASK_SENDERS_ACTION");
    this.$store.dispatch("initialize_TASK_EXECUTORS_ACTION");
    this.$store.dispatch("updateAuthenticatedAction");
  },
};
</script>
