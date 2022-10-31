<template>
  <section id="addTaskForm" class="container">
    <h2>Добавить задачу</h2>
    <form class="form" @submit.prevent="this.createTask">
      <div class="form__group">
        <label class="form__label" for="email">Выберите получателя:</label>
        <select v-model="executor" name="executor" id="executor">
          <option v-for="user in this.userList" :key="user.id" :value="user">
            {{ user.firstName }} {{ user.secondName }}
          </option>
        </select>
      </div>

      <div class="form__group">
        <div class="column">
          <h3>Описание задачи:</h3>
          <textarea
            @blur="v$.description.$touch"
            @keyup.ctrl.enter="this.createTask"
            v-model="description"
            name="task"
            id="task"
            cols="30"
            rows="10"
          ></textarea>
          <small
            v-if="v$.description.$dirty && v$.description.required.$invalid"
            class="invalidData"
            >Поле обязательно для заполнения
          </small>
        </div>
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">Создать задачу</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      executor: this.target,
      sender: this.$store.state.authentication.authenticatedUser,
      description: "",
    };
  },

  validations() {
    return {
      description: { required },
    };
  },
  methods: {
    createTask() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.taskList.push(this.preparedTask);
      this.$store.commit("updateTaskList", this.taskList);
      this.$emit("close");
    },
  },

  computed: {
    preparedTask() {
      return {
        senderId: this.sender.id,
        senderFullName: `${this.sender.firstName} ${this.sender.secondName}`,
        executorId: this.executor.id,
        executorFullName: `${this.executor.firstName} ${this.executor.secondName}`,
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
.invalidData {
  color: red;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
