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
import { ref } from 'vue';

export default {
  components: { MainLayout },
  setup() {
    const dataReceived = ref(false);
    const usersStore = useUsersStore();
    const tasksStore = useTasksStore();
    const authenticatedStore = useAuthenticatedStore();
    const inspectedTaskStore = useInspectedTaskStore();
    const commentsStore = useCommentsStore();

    Promise.allSettled([
      usersStore.INITIALIZE_USER_LIST(),
      tasksStore.INITIALIZE_TASK_LIST(),
      authenticatedStore.INITIALIZE_AUTHENTICATED(),
      inspectedTaskStore.INITIALIZE_INSPECTED_TASK(),
    ]).then(() => {
      if (inspectedTaskStore.INSPECTED_TASK) {
        commentsStore.INITIALIZE_COMMENTS(inspectedTaskStore.INSPECTED_TASK.id);
      }
      dataReceived.value = true;
    });

    return {
      dataReceived,
    };
  },
};
</script>
