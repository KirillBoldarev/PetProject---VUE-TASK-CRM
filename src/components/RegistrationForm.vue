<template>
  <section id="registrationForm" class="container">
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
        <a href="#" class="switch">У меня уже есть аккаунт!</a>
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

  methods: {
    registerUser() {
      let user = this.userData;
      if (!JSON.parse(localStorage.getItem("userList"))) {
        console.log("Единственный юзер");
        localStorage.setItem("userList", JSON.stringify([user]));
        this.$emit("close");
      } else {
        console.log("не единственный юзер");
        localStorage.setItem(
          "userList",
          JSON.stringify([...this.userList, user])
        );
        this.$emit("close");
      }
    },
  },

  computed: {
    userData() {
      return {
        firstName: this.firstName,
        secondName: this.secondName,
        email: this.email,
        phone: this.phone,
        password: this.password,
      };
    },

    userList() {
      let userList = JSON.parse(localStorage.getItem("userList"));
      if (userList === null || Array.isArray(userList) === false) {
        return [];
      }
      return userList;
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
}
</style>
