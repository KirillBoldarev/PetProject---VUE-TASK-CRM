<template>
  <header-layout
    class="main__header"
    :taskList="taskList"
    :userList="userList"
  ></header-layout>
  <div @click="info">ИНФО</div>
  <!--   <div>СТОр ЮЗЕРЛИСТ{{usersStore.GET_USER_LIST}}</div>
  <div> ПРОП ЮЗерлист{{userList}}</div> -->
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

import { useUsersStore } from "./store/UsersStore";
import { useAuthenticatedStore } from "./store/AuthenticatedStore";
import { useInspectedTaskStore } from "./store/InspectedTaskStore";
import { useTasksStore } from "./store/TasksStore";
import { useScreenResolutionStore } from "./store/ScreenResolution";

import { mapStores } from "pinia";

export default {
  components: { HeaderLayout, FooterLayout },
  mixins: [
    subscribtionsForUsersMutationsMixin,
    subscribtionsForTasksMutationsMixin,
  ],
  data() {
    return {
      taskList: [],
      userList: [],
    };
  },
  methods: {
    info() {
      console.log("this.usersStore", this.usersStore);
    },
  },

  computed: {
    ...mapStores(
      useUsersStore,
      useAuthenticatedStore,
      useTasksStore,
      useInspectedTaskStore,
      useScreenResolutionStore
    ),
  },

  created() {
    const mediaQuery = window.matchMedia("(min-width: 810px)");
    if (mediaQuery.matches) {
      this.screenResolutionStore.SET_DESKTOP();
    } else {
      this.screenResolutionStore.SET_MOBILE();
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth > 810) {
        this.screenResolutionStore.SET_DESKTOP();
      } else {
        this.screenResolutionStore.SET_MOBILE();
      }
    });
  },

  mounted() {
    this.usersStore.INITIALIZE_USER_LIST();
    this.authenticatedStore.UPDATE_AUTHENTICATED();
    this.tasksStore.INITIALIZE_TASK_LIST();
    this.inspectedTaskStore.INITIALIZE_INSPECTED_TASK();
  },
};
</script>
