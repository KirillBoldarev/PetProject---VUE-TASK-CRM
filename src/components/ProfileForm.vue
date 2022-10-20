<template>
  <section id="profileForm" class="container">
    <h2>Профиль пользователя</h2>
    <p>Ваши персональные данные:</p>
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
          />
        </div>
        <div class="form__group">
          <label class="form__label" for="phone">Номер телефона</label>
          <input v-model="phone" class="form__input" type="text" name="phone" />
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
        />
      </div>

      <div class="form__group">
        <button
          @click.prevent="this.authenticate"
          class="form__button"
          type="submit"
        >
          Принять
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  components: {},
  name: "ProfileForm",
  data() {
    return {
      email: "",
      password: "",
      invalidEmail: false,
      invalidPassword: false,
      isOpenTaskList:false,
    };
  },

  methods: {},

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
}
</style>
