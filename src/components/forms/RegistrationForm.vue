<template>
  <section id="registrationForm" class="form__container">
    <h2 class="form__title">Регистрация пользователя!</h2>
    <form class="form__body" @submit.prevent="registrateUserHandler">
      <fieldset class="flex-column center form__block">
        <legend class="form__title">Придумайте логин и пароль</legend>
        <div class="flex-column center">
          <div class="flex-row space-between">
            <label class="form__label" for="login">Логин</label>
            <input
              v-model="formData.login"
              v-tooltip.right="'Введите логин'"
              class="form__input"
              type="text"
              name="login"
              @blur="v$.login.$touch"
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
              v-model="formData.password"
              v-tooltip.right="'Введите номер мобильного телефона'"
              class="form__input"
              name="password"
              type="password"
              @blur="v$.password.$touch"
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
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useUsersStore } from '@/stores/UsersStore';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { computed, reactive, onBeforeUnmount } from 'vue';

export default {
  props: {},
  emits: ['close'],

  setup(props, context) {
    const usersStore = useUsersStore();
    const authenticatedStore = useAuthenticatedStore();

    const formData = reactive({
      login: '',
      password: '',
    });
    const rules = {
      login: { required, minLength: minLength(5) },
      password: { required, minLength: minLength(5) },
    };
    const v$ = useVuelidate(rules, formData);

    const userRole = computed(() => {
      if (usersStore.USER_LIST.length === 0) {
        return 'Администратор';
      }
      return 'Неавторизованный пользователь';
    });
    const userId = computed(() => {
      return Math.random().toString(36).substring(2, 9);
    });
    const newUser = computed(() => {
      return {
        login: formData.login,
        password: formData.password,
        id: userId.value,
        role: userRole.value,
      };
    });

    function registrateUserHandler() {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }
      usersStore.CREATE_USER(newUser.value);
      authenticatedStore.AUTHENTICATION(newUser.value);
      context.emit('close');
    }
    //RegistrateOnKeyPress
    function registrateUserOnKeypress(event) {
      if (event.key === 'Enter') {
        registrateUserHandler();
      }
    }
    document.addEventListener('keypress', registrateUserOnKeypress());

    onBeforeUnmount(() => {
      document.removeEventListener('keypress', registrateUserOnKeypress());
    });

    return {
      formData,
      v$,
      registrateUserHandler,
    };
  },
};
</script>
