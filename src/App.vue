<template>
  <main-layout v-if="dataReceived"></main-layout>
</template>

<script>
import MainLayout from './components/layouts/MainLayout.vue';
import { useUsersStore } from './stores/UsersStore';
import { useCommentsStore } from './stores/CommentsStore';
import { useAuthenticatedStore } from './stores/AuthenticatedStore';
import { useInspectedTaskStore } from './stores/InspectedTaskStore';
import { useTasksStore } from './stores/TasksStore';

import { mapStores } from 'pinia';

export default {
  components: { MainLayout },
  data() {
    return {
      dataReceived: false,
    };
  },
  computed: {
    ...mapStores(
      useUsersStore,
      useAuthenticatedStore,
      useTasksStore,
      useInspectedTaskStore,
      useCommentsStore
    ),
  },

  created() {
    Promise.allSettled([
      this.usersStore.INITIALIZE_USER_LIST(),
      this.authenticatedStore.INITIALIZE_AUTHENTICATED(),
      this.tasksStore.INITIALIZE_TASK_LIST(),
      this.inspectedTaskStore.INITIALIZE_INSPECTED_TASK(),
    ]).then(() => {
      if (this.inspectedTaskStore.GET_INSPECTED_TASK) {
        this.commentsStore.INITIALIZE_COMMENTS(
          this.inspectedTaskStore.GET_INSPECTED_TASK.id
        );
      }
      this.dataReceived = true;
    });
  },
  methods: {},
};
</script>
