<template>
  <header-layout
    class="main__header"
    :taskList="taskList"
    :userList="userList"
  ></header-layout>
  <div @click="info">ИНФО</div>
 <!--  <div>{{usersStore.GET_USER_LIST}}</div> -->
  <main class="main__content">
    <router-view :taskList="taskList" :userList="userList"></router-view>
  </main>
  <footer-layout
    :taskList="taskList"
    :userList="userList"
    class="main__footer"
  ></footer-layout>
</template>

<script>
import HeaderLayout from "./components/layouts/HeaderLayout.vue";
import FooterLayout from "./components/layouts/FooterLayout.vue";
import subscribtionsForUsersMutationsMixin from "./js/mixins/subscribtionsForUsersMutationsMixin";
import subscribtionsForTasksMutationsMixin from "./js/mixins/subscribtionsForTasksMutationsMixin";
import subscribtionsForCommentsMutationMixin from "./js/mixins/subscribtionsForCommentsMutationMixin";

import { useUsersStore } from "./store/UsersStore";
import { mapStores } from "pinia";

export default {
  components: { HeaderLayout, FooterLayout },
  mixins: [
    subscribtionsForUsersMutationsMixin,
    subscribtionsForTasksMutationsMixin,
    subscribtionsForCommentsMutationMixin,
  ],
  data() {
    return {
      taskList: [],
      userList: [],
    };
  },
  methods: {
    info() {
      console.log('this.usersStore', this.usersStore);
    },
  },

  computed: {
    ...mapStores(useUsersStore),
  },

  created() {
    const mediaQuery = window.matchMedia("(min-width: 810px)");
    if (mediaQuery.matches) {
      this.$store.dispatch("SET_DESKTOP_ACTION");
    } else {
      this.$store.dispatch("SET_MOBILE_ACTION");
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth > 810) {
        this.$store.dispatch("SET_DESKTOP_ACTION");
      } else {
        this.$store.dispatch("SET_MOBILE_ACTION");
      }
    });
  },

  mounted() {
    this.$store.dispatch("INITIALIZE_USER_LIST_ACTION");
    this.usersStore.INITIALIZE_USER_LIST_ACTION();
    this.$store.dispatch("INITIALIZE_TASK_LIST_ACTION");
    this.$store.dispatch("UPDATE_AUTHENTICATED_ACTION");
    this.$store.dispatch("INITIALIZE_INSPECTED_TASK_ACTION");
  },
};
</script>
