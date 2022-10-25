<template>
  <section id="registrationForm" class="container-form">
    <h2>Регистрация пользователя!</h2>
    <p>Введите ваши персональные данные:</p>
    <form class="form">
      <div class="form__group">
        <label class="form__label" for="firstName">Имя</label>
        <input
          v-model="firstName"
          class="form__input"
          type="text"
          name="firstName"
        />
      </div>

      <div class="form__group">
        <label class="form__label" for="secondName">Фамилия</label>
        <input
          v-model="secondName"
          class="form__input"
          type="text"
          name="secondName"
        />
      </div>

      <div class="form__group">
        <label class="form__label" for="email">Электронная почта</label>
        <input v-model="email" class="form__input" type="email" name="email" />
      </div>

      <div class="form__group">
        <label class="form__label" for="phone">Номер телефона</label>
        <input v-model="phone" class="form__input" type="text" name="phone" />
      </div>

      <div class="form__group">
        <label class="form__label" for="password">Пароль</label>
        <input
          v-model="password"
          class="form__input"
          type="password"
          name="password"
        />
      </div>

      <div class="form__group">
        <button
          @click.prevent="this.registerUser()"
          class="form__button"
          type="submit"
        >
          Зарегистрироваться!
        </button>
        <a @click="this.$emit('changeToLogin')" href="#" class="switch"
          >У меня уже есть аккаунт!</a
        >
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      secondName: "",
      email: "",
      phone: "",
      password: "",
    };
  },

  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  created() {
    document.addEventListener("keypress", this.registerUserOnKeypress);
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.registerUserOnKeypress);
  },
  methods: {
    registerUser() {
      this.userList.push(this.createdUser);
      this.$store.commit("updateUserList", this.userList);
      this.$emit("close");
    },
    registerUserOnKeypress(event) {
      if (event.key === "Enter") {
        this.registerUser;
      }
    },
  },

  computed: {
    createdUser() {
      return {
        firstName: this.firstName,
        secondName: this.secondName,
        email: this.email,
        phone: this.phone,
        password: this.password,
        id: Math.random().toString(36).substring(2, 7),
        role: "Администратор",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

h2 {
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
}
</style>
