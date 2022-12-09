<template>
  <router-view />
  <task-list v-if="$route.name === 'TaskList'" />
</template>

<script>
import TaskList from '@/components/tables/TaskList.vue';

import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { mapStores } from 'pinia';

export default {
  name: 'TaskListPage',

  components: { TaskList },

  props: {},

  data() {
    return {};
  },
  computed: {
    ...mapStores(useInspectedTaskStore),
  },
};
</script>
