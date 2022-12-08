<template>
  <router-view
    :task-list="taskList"
    :user-list="userList"
    :inspected-task="inspectedTaskStore.GET_INSPECTED_TASK"
  />
  <task-list
    v-if="$route.name === 'TaskList'"
    :user-list="userList"
    :task-list="taskList"
  />
</template>

<script>
import TaskList from '@/components/tables/TaskList.vue'

import { useInspectedTaskStore } from '@/stores/InspectedTaskStore'
import { mapStores } from 'pinia'

export default {
  name: 'TaskListPage',

  components: { TaskList },

  props: {
    taskList: {
      type: Array,
      required: true
    },
    userList: {
      type: Array,
      required: true
    }
  },

  data () {
    return {}
  },
  computed: {
    ...mapStores(useInspectedTaskStore)
  }
}
</script>
