<template>
  <router-view
    :taskList="taskList"
    :userList="userList"
    :inspectedTask="this.$store.getters.GET_INSPECTED_TASK"
  >
  </router-view>
  <task-list
    v-if="this.$route.name === 'TaskList'"
    :userList="userList"
    :taskList="taskList"
  ></task-list>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  name: "TaskListPage",

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
};
</script>
