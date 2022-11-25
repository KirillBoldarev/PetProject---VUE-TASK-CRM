<template>
  <task-list :userList="userList" :taskList="taskList"></task-list>
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
    return {
      
    };
  },

};
</script>
