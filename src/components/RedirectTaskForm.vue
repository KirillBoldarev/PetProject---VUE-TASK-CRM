<template>
  <section id="RedirectTaskForm" class="container">
    <h2>Перенаправить задачу</h2>
    <form class="form">
      <div class="form__group">
        <label class="form__label" for="email">Выберите получателя:</label>
        <select v-model="executor" name="executor" id="executor">
          <option v-for="user in this.userList" :key="user.id" :value="user.id">
            {{ user.firstName }} {{ user.secondName }}
          </option>
        </select>
      </div>

      <div class="form__group">
        <button
          @click.prevent="this.redirectTask"
          class="form__button"
          type="submit"
        >
          ОК
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "RedirectTaskForm",
  components: {},
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
      executor: this.target.executor,
      id: this.target.id,
    };
  },
  computed: {},
  methods: {
    redirectTask() {
      this.taskList.forEach((task) => {
        if (task.id === this.id) {
          task.executor = this.executor;
        }
      });
      this.$store.commit("updateTaskList", this.taskList);
      this.$emit("close");
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

.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.icon {
  font-size: 34px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  text-decoration: none;
  cursor: pointer;

  &--mini {
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
}
</style>
