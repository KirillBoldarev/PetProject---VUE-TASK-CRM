<template>
  <router-view
    :taskList="taskList"
    :userList="userList"
    :inspectedTask="inspectedTaskStore.GET_INSPECTED_TASK"
  />
  <task-list
    v-if="$route.name === 'TaskList'"
    :userList="userList"
    :taskList="taskList"
  />
</template>

<script>
import TaskList from '@/components/tables/TaskList.vue';

import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { mapStores } from 'pinia';

export default {
  name: 'TaskListPage',

  components: { TaskList },

  props: {
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },
  computed: {
    ...mapStores(useInspectedTaskStore),
  },
};
</script>
