<template>
  <img
    @click="deleteTask(this.target)"
    class="icon"
    src="@/icons/trash.png"
    alt=""
  />
</template>

<script>
export default {
  name: "DeleteTaskButton",
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
    deleteTask(target) {
      let filteredTasks = this.taskList.filter((task) => task.id !== target.id);
      localStorage.setItem("taskList", JSON.stringify(filteredTasks));
      this.$store.commit("updateTaskList");
    },
  },

  computed: {
    taskList() {
      return this.$store.getters.getTaskList;
    },
  },
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
