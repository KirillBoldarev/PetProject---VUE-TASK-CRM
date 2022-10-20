<template>
  <section id="loginForm" class="container">
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
          @click.prevent="this.authenticate"
          class="form__button"
          type="submit"
        >
          Войти в систему
        </button>
        <a href="#" class="switch">У меня нет аккаунта!</a>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  components: {},
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      foundedUser: {},
      invalidEmail: false,
      invalidPassword: false,
    };
  },

  methods: {
    authenticate(event) {
      let find = this.userList.find((user) => user.email === this.email);
      if (find == undefined) {
        this.invalidEmail = true;
        return;
      }
      if (find.password !== this.password) {
        this.invalidPassword = true;
      } else {
        this.foundedUser = find;
        this.$store.commit("authenticateCurrentUser", this.foundedUser);
        this.$emit("close");
      }
    },
  },

  computed: {
    userList() {
      let userList = JSON.parse(localStorage.getItem("userList"));
      if (userList === null || Array.isArray(userList) === false) {
        return [];
      }
      return userList;
    },

    checkForAuthenticate() {
      return this.$state.getters.checkForAuthenticate;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
p {
  text-align: center;
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
