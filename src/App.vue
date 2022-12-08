<template>
  <main-layout v-if="requireDataReceived"></main-layout>
</template>

<script>
import MainLayout from './components/layouts/MainLayout.vue';
import { useUsersStore } from './stores/UsersStore';
import { useCommentsStore } from './stores/CommentsStore';
import { useAuthenticatedStore } from './stores/AuthenticatedStore';
import { useInspectedTaskStore } from './stores/InspectedTaskStore';
import { useTasksStore } from './stores/TasksStore';
import { useScreenResolutionStore } from './stores/ScreenResolution';

import { mapStores } from 'pinia';

export default {
  components: { MainLayout },
  data() {
    return {
      requireDataReceived: false,
    };
  },
  computed: {
    ...mapStores(
      useUsersStore,
      useAuthenticatedStore,
      useTasksStore,
      useInspectedTaskStore,
      useScreenResolutionStore,
      useCommentsStore
    ),
  },
  created() {
    const mediaQuery = window.matchMedia('(min-width: 810px)');
    if (mediaQuery.matches) {
      this.screenResolutionStore.SET_DESKTOP();
    } else {
      this.screenResolutionStore.SET_MOBILE();
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth > 810) {
        this.screenResolutionStore.SET_DESKTOP();
      } else {
        this.screenResolutionStore.SET_MOBILE();
      }
    });
  },

  mounted() {
    Promise.allSettled([
      this.usersStore.INITIALIZE_USER_LIST(),
      this.authenticatedStore.INITIALIZE_AUTHENTICATED(),
      this.tasksStore.INITIALIZE_TASK_LIST(),
    ]).then(() => {
      this.requireDataReceived = true;
    });
  },
  methods: {},
};
</script>
