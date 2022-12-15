<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <section id="addTaskForm" class="form__container">
    <form class="form__body" @submit.prevent="createTaskHandler">
      <h2 class="form__title">Добавить задачу</h2>
      <fieldset class="flex-column center form__block">
        <legend class="form__title">Адресат</legend>
        <label class="form__label" for="email">Выберите получателя:</label>
        <v-select
          v-model="formData.executor"
          :options="usersStore.USER_LIST"
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
            v-model="formData.title"
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
            v-model="formData.description"
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

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useTasksStore } from '@/stores/TasksStore';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useUsersStore } from '@/stores/UsersStore';
import { computed, reactive } from 'vue';

const usersStore = useUsersStore();
const authenticatedStore = useAuthenticatedStore();
const tasksStore = useTasksStore();

const props = defineProps({
  target: {
    type: Object,
    required: false,
    default: null,
  },
});
const emits = defineEmits(['close']);

const formData = reactive({
  title: '',
  description: '',
  sender: authenticatedStore.AUTHENTICATED.id,
  executor: props.target.id,
});
const rules = {
  description: { required },
  title: { required },
  executor: { required },
};
const v$ = useVuelidate(rules, formData);

const taskId = computed(() => {
  return Math.random().toString(36).substring(2, 9);
});

const newTask = computed(() => {
  return {
    id: taskId.value,
    title: formData.title,
    description: formData.description,
    sender: formData.sender,
    executor: formData.executor,
    isCompleted: false,
    dateOfCreation: new Date(),
  };
});

function createTaskHandler() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  tasksStore.CREATE_TASK(newTask.value);
  emits('close');
}

function getOptionsList(option) {
  if (option.fullName) {
    return option.fullName;
  }
  return option.login;
}
</script>
