<template>
  <section id="loginForm" class="form__container">
    <h3 class="form__title">Редактирование задачи</h3>
    <form  class="form__body" @submit.prevent="confirmation">
      <confirm-dialog
        :isDialogOpen="isDialogOpen"
        @confirm="this.editTask"
        @close="isDialogOpen = false"
      ></confirm-dialog>
      <div class="form__row">
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
      </div>
      <div class="form__group">
        <div class="form__column">
          <h2 class="form__title">Описание задачи:</h2>
          <textarea
            class="form__textbox"
            @blur="v$.description.$touch"
            v-model="description"
            name="task"
            id="task"
            cols="10"
            rows="5"
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
        <label class="form__label" for="">Завершение задачи :</label>
        <complete-task-action
          :target="this.target"
          :taskList="taskList"
        ></complete-task-action>
      </div>

      <div class="form__group">
        <button  class="form__button" type="submit">ОК</button>
      </div>
    </form>
  </section>
</template>

<script>
import CompleteTaskAction from "@/components/actions/CompleteTaskAction.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  name: "EditTaskForm",
  components: {
    CompleteTaskAction,
    ConfirmDialog,
  },
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
      isDialogOpen: false,
      executor: this.target.executorId,
      sender: this.target.senderId,
      description: this.target.description,
      isCompleted: this.target.isCompleted,
      id: this.target.id,
    };
  },

  validations() {
    return {
      description: { required },
    };
  },

  methods: {
    editTask() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$store.commit("editTask", this.changedData);
      this.$emit("close");
    },
    confirmation() {
      this.isDialogOpen = true;
    },

  },
  computed: {
    changedData() {
      return {
        id: this.target.id,
        executorId: this.executor,
        executorFullName: `
      ${this.userList.find((user) => user.id === this.executor).firstName}
      ${this.userList.find((user) => user.id === this.executor).secondName}`,
        senderId: this.sender,
        senderFullName: `
      ${this.userList.find((user) => user.id === this.sender).firstName}
      ${this.userList.find((user) => user.id === this.sender).secondName}`,
        description: this.description,
        isCompleted: this.isCompleted,
      };
    },
  },
};
</script>
