<template>
  <section id="loginForm" class="form__container">
    <h2 class="">Войти в систему!</h2>
    <p>Введите ваши персональные данные:</p>
    <form class="form__body" @submit.prevent="this.authenticateUser">
      <div class="form__group">
        <div class="form__row">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            @blur="v$.email.$touch"
            v-model="email"
            class="form__input"
            type="email"
            name="email"
          />
        </div>
        <div class="form__row">
          <small
            v-if="v$.email.$dirty && v$.email.required.$invalid"
            class="form__invalid"
            >Поле обязательно для заполнения
          </small>
          <small
            v-else-if="v$.email.$dirty && v$.email.email.$invalid"
            class="form__invalid"
            >Некорректный формат электронной почты
          </small>
        </div>
      </div>

      <div class="form__group">
        <div class="form__row">
          <label class="form__label" for="password">Пароль</label>
          <input
            @blur="v$.password.$touch"
            v-model="password"
            class="form__input"
            type="password"
            name="password"
          />
        </div>
        <div class="form__row">
          <small
            v-if="v$.password.$dirty && v$.password.required.$invalid"
            class="form__invalid"
            >Поле обязательно для заполнения
          </small>
        </div>
      </div>

      <div v-if="this.incorrectData === true" class="form__row form__invalid">
        Вы ввели не верный логин или пароль!
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">Войти в систему</button>
        <a @click="this.$emit('changeToRegistration')" href="#" class="switch"
          >У меня нет аккаунта!</a
        >
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

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
      incorrectData: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
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
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      } else {
        let foundedUser = this.userList.find(
          (user) => user.email === this.email
        );
        if (foundedUser == undefined) {
          this.incorrectData = true;
          setTimeout(() => {
            this.incorrectData = false;
          }, 3000);
          return;
        }
        if (foundedUser.password !== this.password) {
          this.incorrectData = true;
          setTimeout(() => {
            this.incorrectData = false;
          }, 3000);
          return;
        }
        this.$store.commit("authentication", foundedUser);
        this.$emit("close");
      }
    },

    authenticateUserOnKeypress(event) {
      if (event.key === "Enter") {
        this.authenticateUser;
      }
    },
  },
};
</script>
