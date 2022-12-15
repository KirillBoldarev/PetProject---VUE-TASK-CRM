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
              v-model="formData.login"
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
              v-model="formData.password"
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

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useUsersStore } from '@/stores/UsersStore';
import { ref, reactive, onBeforeUnmount } from 'vue';

const emit = defineEmits(['close']);

const usersStore = useUsersStore();
const authenticatedStore = useAuthenticatedStore();

const formData = reactive({
  login: '',
  password: '',
});
const rules = {
  login: { required },
  password: { required },
};
const incorrectData = ref(false);
const v$ = useVuelidate(rules, formData);

function authenticateUserHandler() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  } else {
    const foundedUser = usersStore.USER_LIST.find(
      (user) => user.login === formData.login
    );
    if (foundedUser === undefined) {
      incorrectData.value = true;
      setTimeout(() => {
        incorrectData.value = false;
      }, 3000);
      return;
    }
    if (foundedUser.password !== formData.password) {
      incorrectData.value = true;
      setTimeout(() => {
        incorrectData.value = false;
      }, 3000);
      return;
    }
    authenticatedStore.AUTHENTICATION(foundedUser);
    emit('close');
  }
}
document.addEventListener('keypress', authenticateUserOnKeypress(event));
function authenticateUserOnKeypress(event) {
  if (event.key == 'Enter') {
    authenticateUserHandler();
  }
}
onBeforeUnmount(() => {
  document.removeEventListener('keypress', authenticateUserOnKeypress(event));
});
</script>
