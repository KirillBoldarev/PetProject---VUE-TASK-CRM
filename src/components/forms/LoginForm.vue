<template>
  <section id="loginForm" class="form__container">
    <h2 class="">Войти в систему!</h2>

    <form class="form__body" @submit.prevent="authenticateUserHandler">
      <fieldset class="flex-column center form__block">
        <legend class="form__title">Введите ваши персональные данные</legend>
        <div class="flex-column center">
          <div class="flex-row space-between">
            <label class="form__label" for="login">Логин</label>
            <input
              v-model="login"
              class="form__input"
              type="text"
              name="login"
              @blur="v$.login.$touch"
            />
          </div>
          <transition>
            <small
              v-if="v$.login.$dirty && v$.login.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </transition>
        </div>

        <div class="flex-column center">
          <div class="flex-row space-between">
            <label class="form__label" for="password">Пароль</label>
            <input
              v-model="password"
              class="form__input"
              type="password"
              name="password"
              @blur="v$.password.$touch"
            />
          </div>
          <div class="flex-row center">
            <transition>
              <small
                v-if="v$.password.$dirty && v$.password.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
            </transition>
          </div>
        </div>
      </fieldset>

      <transition>
        <strong
          v-if="incorrectData === true"
          class="flex-row center form__invalid"
        >
          Вы ввели не верный логин или пароль!
        </strong>
      </transition>

      <div class="flex-column center">
        <button class="button" type="submit">Войти в систему</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { mapStores } from 'pinia';

export default {
  name: 'LoginForm',

  components: {},

  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      login: '',
      password: '',
      incorrectData: false,
    };
  },
  validations() {
    return {
      login: { required },
      password: { required },
    };
  },

  created() {
    document.addEventListener('keypress', this.authenticateUserOnKeypress);
  },
  beforeUnmount() {
    document.removeEventListener('keypress', this.authenticateUserOnKeypress);
  },

  methods: {
    authenticateUserHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
      } else {
        const foundedUser = this.userList.find(
          (user) => user.login === this.login
        );
        if (foundedUser === undefined) {
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
        this.authenticatedStore.AUTHENTICATION(foundedUser);
        this.$emit('close');
      }
    },

    authenticateUserOnKeypress(event) {
      if (event.key == 'Enter') {
        this.authenticateUserHandler();
        console.log(someVariable);
      }
    },
  },
  computed: {
    ...mapStores(useAuthenticatedStore),
  },
};
</script>
