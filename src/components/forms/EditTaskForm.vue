<template>
  <section id="editTaskForm" class="form__container">
    <form class="form__body" @submit.prevent="confirmation">
      <h2 class="form__title">Редактирование задачи</h2>
      <confirm-dialog
        :is-dialog-open="isDialogOpen"
        @confirm="editTaskHandler"
        @close="isDialogOpen = false"
      />

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Адресаты</legend>
        <div class="flex-column center">
          <label class="form__label" for="email">Отправитель:</label>
          <select
            id="sender"
            v-model="sender"
            class="form__select"
            name="sender"
          >
            <option
              v-for="user in userList"
              :key="user.id"
              class="form__option"
              :value="user.id"
            >
              <span v-if="user.firstName && user.secondName"
                >{{ user.firstName }} {{ user.secondName }}</span
              >
              <span v-else>{{ user.login }}</span>
            </option>
          </select>
        </div>

        <div class="flex-column center">
          <label class="form__label" for="email">Исполнитель:</label>
          <select
            id="executor"
            v-model="executor"
            class="form__select"
            name="executor"
          >
            <option
              v-for="user in userList"
              :key="user.id"
              class="form__option"
              :value="user.id"
            >
              <span v-if="user.firstName && user.secondName"
                >{{ user.firstName }} {{ user.secondName }}</span
              >
              <span v-else>{{ user.login }}</span>
            </option>
          </select>
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

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapStores } from 'pinia';
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin';
import { useTasksStore } from '@/stores/TasksStore';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';

export default {
  name: 'EditTaskForm',
  components: {
    ConfirmDialog,
  },
  mixins: [confirmationDialogMixin],
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
  emits: ['edited', 'close'],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      ...this.target,
    };
  },

  validations() {
    return {
      description: { required },
      title: { required },
    };
  },
  computed: {
    ...mapStores(useTasksStore, useInspectedTaskStore),
    changedTask() {
      return {
        // all keys from target object
        id: this.id,
        title: this.title,
        description: this.description,
        sender: this.sender,
        executor: this.executor,
        isCompleted: this.isCompleted,
        comments: this.comments,
        dateOfCreation: this.dateOfCreation,
        dateOfCompletion: this.dateOfCompletion,
      };
    },
  },
  methods: {
    editTaskHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.tasksStore.EDIT_TASK(this.changedTask);
      if (
        this.inspectedTaskStore.GET_INSPECTED_TASK &&
        this.inspectedTaskStore.GET_INSPECTED_TASK.id === this.changedTask.id
      ) {
        this.inspectedTaskStore.EDIT_INSPECTED_TASK(this.changedTask);
      }
      this.$emit('edited');
      this.$emit('close');
    },
  },
};
</script>
