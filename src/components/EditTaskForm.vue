<template>
  <section id="loginForm" class="container">
    <h2>Редактирование задачи</h2>
    <form class="form" @submit.prevent="this.editTask">
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
      <div class="form__group">
        <div class="column">
          <h3>Описание задачи:</h3>
          <textarea
            @blur="v$.description.$touch"
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
        <label class="form__label" for="">Завершение задачи :</label>
        <complete-task-button
          :target="this.target"
          :taskList="taskList"
        ></complete-task-button>
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">ОК</button>
      </div>
    </form>
  </section>
</template>

<script>
import CompleteTaskButton from "@/components/CompleteTaskButton.vue";
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
    CompleteTaskButton,
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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 750px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  max-height: 100%;
  align-items: center;
  justify-content: center;

  &__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
