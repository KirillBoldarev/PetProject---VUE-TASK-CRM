<template>
  <section id="loginForm" class="form__container">
    <form class="form__body" @submit.prevent="confirmation">
      <h2 class="form__title">Редактирование задачи</h2>
      <confirm-dialog
        :isDialogOpen="isDialogOpen"
        @confirm="editTaskHandler"
        @close="isDialogOpen = false"
      ></confirm-dialog>

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Адресаты</legend>
        <div class="flex-column center">
          <label class="form__label" for="email">Отправитель:</label>
          <select
            class="form__select"
            v-model="sender"
            name="sender"
            id="sender"
          >
            <option
              class="form__option"
              v-for="user in userList"
              :key="user.id"
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
            class="form__select"
            v-model="executor"
            name="executor"
            id="executor"
          >
            <option
              class="form__option"
              v-for="user in userList"
              :key="user.id"
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
              class="form__input"
              @blur="v$.title.$touch"
              v-model="title"
              v-tooltip.right="'Опишите суть задачи'"
              name="title"
              type="text"
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
              v-tooltip.right="'Дайте подробное описание требований к задаче'"
              class="form__textbox"
              @blur="v$.description.$touch"
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
        </div>
      </fieldset>

      <div class="flex-column center">
        <button class="button" type="submit">ОК</button>
      </div>
    </form>
  </section>
</template>

<script>
import ConfirmDialog from "@/components/tools/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useTasksStore } from "@/stores/TasksStore";
import { mapStores } from "pinia";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  name: "EditTaskForm",
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
  emits: ["edited", "close"],

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

  methods: {
    editTaskHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.tasksStore.EDIT_TASK(this.changedTask)
      this.$emit("edited");
      this.$emit("close");
    },
  },
  computed: {
    ...mapStores(useTasksStore),
    changedTask() {
      return {
        //all keys from target object
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
};
</script>
