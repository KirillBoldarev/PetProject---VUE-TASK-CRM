<template>
  <section id="loginForm" class="form__container">
    <h3 class="form__title">Редактирование задачи</h3>
    <form class="form__body" @submit.prevent="confirmation">
      <confirm-dialog
        :isDialogOpen="isDialogOpen"
        @confirm="this.editHandler"
        @close="isDialogOpen = false"
      ></confirm-dialog>
      <div class="flex-row center">
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
              :value="user"
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
              :value="user"
            >
              <span v-if="user.firstName && user.secondName"
                >{{ user.firstName }} {{ user.secondName }}</span
              >
              <span v-else>{{ user.login }}</span>
            </option>
          </select>
        </div>
      </div>
      <div class="flex-column center">
        <div class="flex-column center">
          <h2 class="form__title">Заголовок задачи:</h2>
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
          <h2 class="form__title">Описание задачи:</h2>
          <textarea
            v-tooltip.right="'Дайте подробное описание требований к задаче'"
            class="form__textbox"
            @blur="v$.description.$touch"
            v-model="description"
            name="task"
            id="task"
            cols="25"
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
      <div class="flex-column center">
        <button class="button" type="submit">ОК</button>
      </div>
    </form>
  </section>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapMutations } from "vuex";

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

  data() {
    return {
      executor: this.userList.find(
        (user) =>
          user.id ===
          this.$store.getters.TASK_EXECUTORS.find(
            (record) => record.task === this.target.id
          ).executor
      ),
      sender: this.userList.find(
        (user) =>
          user.id ===
          this.$store.getters.TASK_SENDERS.find(
            (record) => record.task === this.target.id
          ).sender
      ),
      //Get all keys from object target = task
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
    ...mapMutations(["editTask", "rebindTask"]),

    editHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.editTask(this.changedData);
      this.rebindTask({
        id: this.id,
        sender: this.sender.id,
        executor: this.executor.id,
      });
      this.$emit("edited");
      this.$emit("close");
    },
  },
  computed: {
    changedData() {
      return {
        //all keys from target object
        id: this.id,
        description: this.description,
        isCompleted: this.isCompleted,
        title: this.title,
        commits: this.commits,
        dateOfCreation: this.dateOfCreation,
        dateOfCompletion: this.dateOfCompletion,
      };
    },
  },
};
</script>
