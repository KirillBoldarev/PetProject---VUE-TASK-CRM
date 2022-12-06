<template>
  <section id="registrationForm" class="form__container">
    <h2 class="form__title">Регистрация пользователя!</h2>
    <form class="form__body" @submit.prevent="this.registrateUserHandler">
      <fieldset class="flex-column center form__block">
        <legend class="form__title">Придумайте логин и пароль</legend>
        <div class="flex-column center">
          <div class="flex-row space-between">
            <label class="form__label" for="login">Логин</label>
            <input
              @blur="v$.login.$touch"
              v-tooltip.right="'Введите логин'"
              v-model="login"
              class="form__input"
              type="text"
              name="login"
            />
          </div>
          <div class="row">
            <transition-group>
              <small
                v-if="v$.login.$dirty && v$.login.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
              <small
                v-if="v$.login.$dirty && v$.login.minLength.$invalid"
                class="form__invalid"
                >Введите не менее
                {{ v$.password.minLength.$params.min }} символов
              </small>
            </transition-group>
          </div>
        </div>

        <div class="flex-column center">
          <div class="flex-row space-between">
            <label class="form__label" for="password">Пароль</label>
            <input
              @blur="v$.password.$touch"
              v-tooltip.right="'Введите номер мобильного телефона'"
              v-model="password"
              class="form__input"
              type="password"
              name="password"
            />
          </div>
          <div class="form__column">
            <transition-group>
              <small
                v-if="v$.password.$dirty && v$.password.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
              <small
                v-if="v$.password.$dirty && v$.password.minLength.$invalid"
                class="form__invalid"
                >Введите не менее
                {{ v$.password.minLength.$params.min }} символов
              </small>
            </transition-group>
          </div>
        </div>
      </fieldset>

      <div class="flex-column center">
        <button class="button" type="submit">Зарегистрироваться!</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useUsersStore } from "@/store/UsersStore";
import { useAuthenticatedStore } from "@/store/AuthenticatedStore";
import { mapStores } from "pinia";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      login: "",
      password: "",
    };
  },
  validations() {
    return {
      login: { required, minLength: minLength(5) },
      password: { required, minLength: minLength(5) },
    };
  },
  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  created() {
    document.addEventListener("keypress", this.registrateUserOnKeypress);
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.registrateUserOnKeypress);
  },
  methods: {
    registrateUserHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.usersStore.CREATE_USER(this.newUser);
      this.authenticatedStore.AUTHENTICATION(this.newUser)
      this.$emit("close");
    },

    registrateUserOnKeypress(event) {
      if (event.key === "Enter") {
        this.registrateUserHandler;
      }
    },
  },

  computed: {
    ...mapStores(useUsersStore, useAuthenticatedStore),
    newUser() {
      return {
        login: this.login,
        password: this.password,
        id: this.userId,
        role: this.userRole,
      };
    },
    userRole() {
      if (this.usersStore.GET_USER_LIST.length === 0) {
        return "Администратор";
      }
      return "Неавторизованный пользователь";
    },
    userId() {
      return Math.random().toString(36).substring(2, 9);
    },
  },
};
</script>
