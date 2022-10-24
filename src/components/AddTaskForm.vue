<template>
  <section id="addTaskForm" class="container">
    <h2>Добавить задачу</h2>
    <form class="form">
      <div class="form__group">
        <label class="form__label" for="email">Выберите получателя:</label>
        <select v-model="executor" name="executor" id="executor">
          <option v-for="user in this.userList" :key="user.id" :value="user.id">
            {{ user.firstName }} {{ user.secondName }}
          </option>
        </select>
      </div>

      <div class="form__group">
        <div class="column">
          <h3>Описание задачи:</h3>
          <textarea
            v-model="description"
            name="task"
            id="task"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>

      <div class="form__group">
        <button
          @click.prevent="this.createTask"
          class="form__button"
          type="submit"
        >
          Создать задачу
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  components: {},
  name: "AddTaskForm",
  props: {
    target: {
      type: Object,
      required: true,
    },
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
      executor: this.target.id,
      sender: this.$store.state.authentication.authenticatedUser.id,
      description: "",
    };
  },

  methods: {
    createTask() {
      this.taskList.push(this.designedTask);
      this.$store.commit("updateTaskList", this.taskList);
      this.$emit("close");
    },
  },

  computed: {
    designedTask() {
      return {
        sender: this.sender,
        executor: this.executor,
        description: this.description,
        id: Math.random().toString(36).substring(2, 7),
        isCompleted: false,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

  &__group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  &__input {
    padding: 5px;
  }
  &__button {
    padding: 15px;
    font-size: 16px;
  }
  &__invalid {
    color: red;
    text-decoration: underline;
  }
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>
