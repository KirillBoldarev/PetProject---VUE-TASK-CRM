<template>
  <section id="profileForm" class="container">
    <div class="header">
      <h2 class="header__title">Профиль пользователя</h2>
      <div class="header__tooltipBox">
        <div class="header__tooltipItem">
          <img
            @click="this.editMode = !this.editMode"
            class="icon"
            src="@/icons/edit.png"
            alt=""
          />
          <span> Редактировать</span>
        </div>
        <div class="header__tooltipItem">
          <img
            @click="this.taskListMode = !this.taskListMode"
            class="icon"
            src="@/icons/task.png"
            alt=""
          />
          <span> Задачи</span>
        </div>
      </div>
    </div>

    <div class="main">
      <h3>Ваши персональные данные:</h3>
      <form class="form">
        <div class="row">
          <div class="form__group">
            <label
              v-if="this.invalidEmail === false"
              class="form__label"
              for="email"
              >Имя</label
            >
            <input
              v-model="firstName"
              class="form__input"
              type="firtstName"
              name="firstName"
              :disabled="editMode === false"
            />
          </div>

          <div class="form__group">
            <label class="form__label" for="secondName">Фамилия</label>
            <input
              v-model="secondName"
              class="form__input"
              type="text"
              name="secondName"
              :disabled="editMode === false"
            />
          </div>
        </div>

        <div class="row">
          <div class="form__group">
            <label
              v-if="this.invalidEmail === false"
              class="form__label"
              for="email"
              >Электронная почта</label
            >
            <label
              v-if="this.invalidEmail === true"
              class="form__invalid"
              for="email"
              >Введена не верная электронная почта!</label
            >
            <input
              v-model="email"
              class="form__input"
              type="email"
              name="email"
              :disabled="editMode === false"
            />
          </div>
          <div class="form__group">
            <label class="form__label" for="phone">Номер телефона</label>
            <input
              v-model="phone"
              class="form__input"
              type="text"
              name="phone"
              :disabled="editMode === false"
            />
          </div>
        </div>

        <div class="form__group">
          <label
            v-if="this.invalidPassword === false"
            class="form__label"
            for="password"
            >Пароль</label
          >
          <label
            v-if="this.invalidPassword === true"
            class="form__invalid"
            for="password"
            >Введен не верный пароль!</label
          >
          <input
            v-model="password"
            class="form__input"
            type="password"
            name="password"
            :disabled="editMode === false"
          />
        </div>

        <div class="form__group">
          <button
            @click.prevent="this.updateUserData"
            class="form__button"
            type="submit"
          >
            Принять
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  name: "ProfileForm",
  data() {
    return {
      firstName: "",
      secondName: "",
      email: "",
      phone: "",
      password: "",
      id: "",

      invalidEmail: false,
      invalidPassword: false,
      isOpenTaskList: false,
      editMode: false,
      taskListMode: false,
    };
  },

  props: {
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.importUserdata();
  },
  methods: {
    importUserdata() {
      this.firstName = this.$store.getters.authenticatedUser.firstName;
      this.secondName = this.$store.getters.authenticatedUser.secondName;
      this.email = this.$store.getters.authenticatedUser.email;
      this.phone = this.$store.getters.authenticatedUser.phone;
      this.password = this.$store.getters.authenticatedUser.password;
      this.id = this.$store.getters.authenticatedUser.id;
    },
    updateUserData() {
      this.userList.forEach((user) => {
        if (user.id === this.id) {
          user.firstName = this.firstName;
          user.secondName = this.secondName;
          user.email = this.email;
          user.phone = this.phone;
          user.password = this.password;
        }
        this.$store.commit("updateUserList", this.userList);
        this.$store.commit("updateAuthUser");
        this.$emit("close");
      });
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 750px;
}

.header {
  display: flex;
  flex: 0 0 20%;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;

  &__tooltipBox {
    display: flex;
    flex-direction: row;
    flex: 0 0 auto;
    gap: 20px;
  }

  &__tooltipItem {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 1px solid gray;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
}

.main {
  display: flex;
  flex-direction: column;
  flex: 0 0 20%;
  gap: 20px;
  overflow-y: scroll;
  padding: 5px;
  max-height: 600px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  max-height: 100%;

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
