<template>
  <section id="loginForm" class="container">
    <h2>Редактирование задачи</h2>
    <form class="form">
      <div class="form__group">
        <label class="form__label" for="email">Выберите отправителя:</label>
        <select v-model="sender" name="sender" id="sender">
          <option v-for="user in userList" :key="user.id" :value="user.id">
            {{ user.firstName }} {{ user.secondName }}
          </option>
        </select>
      </div>

      <div class="form__group">
        <label class="form__label" for="email">Выберите получателя:</label>
        <select v-model="executor" name="executor" id="executor">
          <option v-for="user in userList" :key="user.id" :value="user.id">
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
        <label class="form__label" for="">Завершение задачи :</label>
        <complete-task-button :target="this.target"></complete-task-button>
      </div>

      <div class="form__group">
        <button
          @click.prevent="this.updateTaskData"
          class="form__button"
          type="submit"
        >
          ОК
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import CompleteTaskButton from "@/components/CompleteTaskButton.vue";

export default {
  name: "EditTaskForm",
  components: {
    CompleteTaskButton,
  },
  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      executor: this.target.executor,
      sender: this.target.sender,
      description: this.target.description,
      isCompleted: this.target.isCompleted,
      id: this.target.id,
    };
  },
  computed: {
    userList() {
      return JSON.parse(localStorage.getItem("userList"));
    },
    taskList() {
      return JSON.parse(localStorage.getItem("taskList"));
    },
  },
  methods: {
    updateTaskData() {
      let updatedTaskList = this.taskList;
      updatedTaskList.forEach((task) => {
        if (task.id === this.id) {
          task.executor = this.executor;
          task.sender = this.sender;
          task.description = this.description;
        }
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        this.$store.commit("updateTaskList");
        this.$emit("close");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 750px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  max-height: 100%;
  align-items: center;
  justify-content: center;

  &__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

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
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
}
</style>
