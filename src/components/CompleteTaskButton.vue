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
    taskList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    completeTask(target) {
      this.taskList.forEach((task) => {
        if (task.id === target.id) {
          target.isCompleted = !target.isCompleted;
          this.$store.commit("updateTaskList", this.taskList);
        }
      });
    },
  },

  computed: {},
};
</script>
