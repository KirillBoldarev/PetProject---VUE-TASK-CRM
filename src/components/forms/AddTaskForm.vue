<template>
  <section id="addTaskForm" class="form__container">
    <h2 class="form__title">Добавить задачу</h2>
    <form class="form__body" @submit.prevent="this.createTask">
      <div class="form__group">
        <label class="form__label" for="email">Выберите получателя:</label>
        <select v-model="executor" name="executor" id="executor">
          <option v-for="user in this.userList" :key="user.id" :value="user">
            {{ user.firstName }} {{ user.secondName }}
          </option>
        </select>
      </div>

      <div class="form__group">
        <div class="form__column">
          <h3 class="form__title">Описание задачи:</h3>
          <textarea
          class="form__textbox"
            @blur="v$.description.$touch"
            @keyup.ctrl.enter="this.createTask"
            v-model="description"
            name="task"
            id="task"
            cols="30"
            rows="10"
          ></textarea>
          <transition>
            <small
              v-if="v$.description.$dirty && v$.description.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </transition>
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
      this.$store.commit("addTask", this.preparedTask);
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
