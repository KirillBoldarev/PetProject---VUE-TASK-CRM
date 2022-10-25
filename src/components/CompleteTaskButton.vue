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

<style lang="scss" scoped>
.icon {
  font-size: 34px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  text-decoration: none;
  cursor: pointer;

  &--mini {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
</style>
