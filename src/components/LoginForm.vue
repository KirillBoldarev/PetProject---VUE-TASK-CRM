<template>
  <section id="loginForm" class="container-form">
    <h2>Войти в систему!</h2>
    <p>Введите ваши персональные данные:</p>
    <form class="form">
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
        <input v-model="email" class="form__input" type="email" name="email" />
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
        />
      </div>

      <div class="form__group">
        <button
          @click.prevent="this.authenticateUser"
          class="form__button"
          type="submit"
        >
          Войти в систему
        </button>
        <a @click="this.$emit('changeToRegistration')" href="#" class="switch"
          >У меня нет аккаунта!</a
        >
      </div>
    </form>
  </section>
</template>

<script>
export default {
  components: {},
  name: "LoginForm",

  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      invalidEmail: false,
      invalidPassword: false,
    };
  },

  created() {
    document.addEventListener("keypress", this.authenticateUserOnKeypress);
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.authenticateUserOnKeypress);
  },

  methods: {
    authenticateUser() {
      let foundedUser = this.userList.find((user) => user.email === this.email);
      if (foundedUser == undefined) {
        this.invalidEmail = true;
        return;
      }
      if (foundedUser.password !== this.password) {
        this.invalidPassword = true;
      } else {
        this.$store.commit("authenticateCurrentUser", foundedUser);
        this.$emit("close");
      }
    },

    authenticateUserOnKeypress(event) {
      if (event.key === "Enter") {
        this.authenticateUser;
      }
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}

.container-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

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
</style>
