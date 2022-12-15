<template>
  <section id="editTaskForm" class="form__container">
    <form class="form__body" @submit.prevent="confirmation">
      <h2 class="form__title">Редактирование задачи</h2>
      <confirm-dialog
        :isDialogOpen="isDialogOpen"
        @confirm="editTaskHandler"
        @close="isDialogOpen = false"
      />
      <fieldset class="flex-column center form__block">
        <legend class="form__title">Адресаты</legend>
        <div class="flex-column center">
          <label class="form__label" for="email">Отправитель:</label>
          <v-select
            v-model="sender"
            class="customStyle"
            :options="usersStore.USER_LIST"
            :getOptionLabel="(option) => getOptionsList(option)"
            :reduce="(option) => option.id"
          ></v-select>
          <transition>
            <small
              v-if="v$.sender.$dirty && v$.sender.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </transition>
        </div>

        <div class="flex-column center">
          <label class="form__label" for="email">Исполнитель:</label>
          <v-select
            v-model="executor"
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
        </div>
      </fieldset>

      <fieldset class="flex-column center form__block">
        <legend class="form__title">Описание</legend>
        <div class="flex-column center">
          <div class="flex-column center">
            <h2 class="form__title">Заголовок:</h2>
            <input
              v-model="title"
              v-tooltip.right="'Опишите суть задачи'"
              class="form__input"
              name="title"
              type="text"
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
        </div>
        <div class="flex-column center">
          <div class="flex-column center">
            <h2 class="form__title">Подробности:</h2>
            <textarea
              id="task"
              v-model="description"
              v-tooltip.right="'Дайте подробное описание требований к задаче'"
              class="form__textbox"
              name="task"
              cols="35"
              rows="10"
              @blur="v$.description.$touch"
            />
            <transition>
              <small
                v-if="v$.description.$dirty && v$.description.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
            </transition>
          </div>
        </div>
      </fieldset>

      <div class="flex-column center">
        <button class="button" type="submit">ОК</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import { confirmation, isDialogOpen } from '@/js/composables/confirmation';
import { useTasksStore } from '@/stores/TasksStore';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { useUsersStore } from '@/stores/UsersStore';
import { reactive, computed } from 'vue';

const tasksStore = useTasksStore();
const inspectedTaskStore = useInspectedTaskStore();
const usersStore = useUsersStore();

const props = defineProps({
  target: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(['edited', 'close']);

const formData = reactive({
  ...props.target,
});
const rules = {
  description: { required },
  title: { required },
  sender: { required },
  executor: { required },
};
const v$ = useVuelidate(rules, formData);

const changedTask = computed(() => {
  return {
    id: props.target.id,
    title: formData.title,
    description: formData.description,
    sender: formData.sender,
    executor: formData.executor,
    isCompleted: props.target.isCompleted,
    dateOfCreation: props.target.dateOfCreation,
    dateOfCompletion: props.target.dateOfCompletion,
  };
});

function editTaskHandler() {
  if (v$.value.$invalid) {
    v$.value.$touch();

    return;
  }
  tasksStore.EDIT_TASK(changedTask.value);
  if (
    inspectedTaskStore.INSPECTED_TASK &&
    this.inspectedTaskStore.INSPECTED_TASK.id === changedTask.value.id
  ) {
    inspectedTaskStore.EDIT_INSPECTED_TASK(changedTask.value);
  }
  emits('edited');
  emits('close');
}

function getOptionsList(option) {
  if (option.fullName) {
    return option.fullName;
  }
  return option.login;
}
</script>
