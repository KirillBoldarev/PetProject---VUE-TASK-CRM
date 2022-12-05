<template>
  <section id="addTaskForm" class="form__container">
    <form class="form__body" @submit.prevent="createTaskHandler">
      <h2 class="form__title">Добавить задачу</h2>
      <fieldset class="flex-row center form__block">
        <legend class="form__title">Адресат</legend>
        <label class="form__label" for="email">Выберите получателя:</label>


        <select
          class="form__select"
          v-model="executor"
          name="executor"
          id="executor"
        >
          <option
            class="form__option"
            v-for="user in userList"
            :key="user.id"
            :value="user"
          >
            <span v-if="user.firstName && user.secondName"
              >{{ user.firstName }} {{ user.secondName }}</span
            >
            <span v-else>{{ user.login }}</span>
          </option>
        </select>
      </fieldset>

      <fieldset class="flex-column center form__block">
        <legend class="form__title">Описание</legend>
        <div class="flex-column center">
          <label class="form__label" for="title">Заголовок:</label>
          <input
            v-tooltip.right="'Опишите суть задачи'"
            @blur="v$.title.$touch"
            v-model="title"
            class="form__input"
            type="text"
            name="title"
          />
          <transition>
            <small
              v-if="v$.title.$dirty && v$.title.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </transition>
        </div>
        <div class="flex-column center">
          <label class="form__label">Подробности:</label>
          <textarea
            v-tooltip.right="'Дайте подробное описание требований к задаче'"
            class="form__textbox"
            @blur="v$.description.$touch"
            @keyup.ctrl.enter="createTaskHandler"
            v-model="description"
            name="task"
            id="task"
            cols="35"
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
      </fieldset>

      <div class="flex-column center">
        <button class="button" type="submit">Создать задачу</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapMutations } from "vuex";


export default {
  components: { },
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
  emits: ["close"],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      executor: this.target,
      sender: this.$store.getters.GET_AUTH,
      title: "",
      description: "",
    };
  },

  validations() {
    return {
      description: { required },
      title: { required },
    };
  },
  methods: {
    ...mapMutations(["CREATE_TASK", "BIND_TASK"]),

    createTaskHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.CREATE_TASK(this.newTask);
      this.$emit("close");
    },
  },

  computed: {
    newTask() {
      return {
        id: this.taskId,
        title: this.title,
        description: this.description,
        sender: this.sender.id,
        executor: this.executor.id,
        isCompleted: false,
        dateOfCreation: new Date(),
      };
    },
    taskId() {
      return Math.random().toString(36).substring(2, 9);
    },
  },
};
</script>
