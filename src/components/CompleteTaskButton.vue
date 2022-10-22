<template>
  <img
    v-if="target.isCompleted === true"
    @click="completeTask(this.target)"
    class="icon--mini"
    src="@/icons/check.png"
    alt=""
  />
  <img
    v-if="target.isCompleted === false"
    @click="completeTask(this.target)"
    class="icon--mini"
    src="@/icons/notСheck.png"
    alt=""
  />
</template>

<script>
export default {
  name: "CompleteTaskButton",
  components: {},

  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    completeTask(target) {
      let updatedTasks = this.taskList;
      updatedTasks.forEach((task) => {
        if (task.id === target.id) {
          target.isCompleted = !target.isCompleted;
          localStorage.setItem("taskList", JSON.stringify(updatedTasks));
          this.$store.commit("updateTaskList");
        }
      });
    },
  },

  computed: {
    taskList() {
      return this.$store.getters.getTaskList;
    },
  },
};
</script>
