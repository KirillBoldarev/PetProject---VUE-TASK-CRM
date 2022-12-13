<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <section id="addTaskForm" class="form__container">
    <form class="form__body" @submit.prevent="createTaskHandler">
      <h2 class="form__title">Добавить задачу</h2>
      <fieldset class="flex-column center form__block">
        <legend class="form__title">Адресат</legend>
        <label class="form__label" for="email">Выберите получателя:</label>
        <v-select
          v-model="executor"
          :options="usersStore.GET_USER_LIST"
          :getOptionLabel="(option) => getOptionsList(option)"
          :reduce="(option) => option.id"
        ></v-select>
        <transition>
          <small
            v-if="v$.executor.$dirty && v$.executor.required.$invalid"
            class="form__invalid"
            >Поле обязательно для заполнения
          </small>
        </transition>
      </fieldset>

      <fieldset class="flex-column center form__block">
        <legend class="form__title">Описание</legend>
        <div class="flex-column center">
          <label class="form__label" for="title">Заголовок:</label>
          <input
            v-model="title"
            v-tooltip.right="'Опишите суть задачи'"
            class="form__input"
            type="text"
            name="title"
            @blur="v$.title.$touch"
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
            id="task"
            v-model="description"
            v-tooltip.right="'Дайте подробное описание требований к задаче'"
            class="form__textbox"
            name="task"
            cols="35"
            rows="10"
            @blur="v$.description.$touch"
            @keyup.ctrl.enter="createTaskHandler"
          />
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapStores } from 'pinia';
import { useTasksStore } from '@/stores/TasksStore';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useUsersStore } from '@/stores/UsersStore';

export default {
  name: 'AddTaskForm',
  components: {},
  props: {
    target: {
      type: Object,
      required: false,
      default: null,
    },
  },
  emits: ['close'],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      executor: null,
      sender: null,
      title: '',
      description: '',
    };
  },

  validations() {
    return {
      description: { required },
      title: { required },
      executor: { required },
    };
  },
  computed: {
    ...mapStores(useAuthenticatedStore, useTasksStore, useUsersStore),
    newTask() {
      return {
        id: this.taskId,
        title: this.title,
        description: this.description,
        sender: this.sender,
        executor: this.executor,
        isCompleted: false,
        dateOfCreation: new Date(),
      };
    },
    taskId() {
      return Math.random().toString(36).substring(2, 9);
    },
  },

  beforeMount() {
    this.sender = this.authenticatedStore.GET_AUTH.id;
  },
  methods: {
    createTaskHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.tasksStore.CREATE_TASK(this.newTask);
      this.$emit('close');
    },
    getOptionsList(option) {
      if (option.fullName) {
        return option.fullName;
      }
      return option.login;
    },
  },
};
</script>
