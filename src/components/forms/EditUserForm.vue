<template>
  <section id="EditUserForm" class="form__container">
    <form class="form__body" @submit.prevent="confirmation">
      <h2 class="form__title">
        Данные пользователя:
        <strong v-if="!target.fullName">{{ target.login }}</strong>
        <strong v-if="target.fullName">{{ target.fullName }}</strong>
      </h2>
      <confirm-dialog
        :is-dialog-open="isDialogOpen"
        @confirm="editUser"
        @close="isDialogOpen = false"
      />

      <div
        v-if="authenticatedStore.AUTH.role === 'Администратор'"
        class="flex-column center"
      >
        <label class="form__label" for="email"
          >Выберите роль пользователя:</label
        >
        <v-select
          v-model="formData.role"
          :options="ROLE"
          label="role"
        ></v-select>
        <transition>
          <small
            v-if="v$.role.$dirty && v$.role.required.$invalid"
            class="form__invalid"
            >Поле обязательно для заполнения
          </small>
        </transition>
      </div>

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Аутентификация</legend>
        <div class="flex-column center">
          <label class="form__label" for="login">Логин</label>
          <input
            v-model="formData.login"
            class="form__input"
            type="text"
            name="login"
            @blur="v$.login.$touch"
          />
          <div class="flex-row center">
            <small
              v-if="v$.login.$dirty && v$.login.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </div>
        </div>

        <div class="flex-column center">
          <label class="form__label" for="password">Пароль</label>
          <input
            v-model="formData.password"
            class="form__input"
            type="password"
            name="password"
            @blur="v$.password.$touch"
          />
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

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Персональные данные</legend>
        <div class="flex-column center">
          <label class="form__label" for="email">Имя и фамилия</label>
          <input
            v-model="formData.fullName"
            class="form__input"
            name="fullName"
            @blur="v$.fullName.$touch"
          />
        </div>
      </fieldset>

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Контакты</legend>
        <div class="flex-column center">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            v-model="formData.email"
            class="form__input"
            type="email"
            name="email"
            @blur="v$.email.$touch"
          />
          <div class="form__column">
            <transition>
              <small
                v-if="v$.email.$dirty && v$.email.email.$invalid"
                class="form__invalid"
                >Некорректный формат электронной почты
              </small>
            </transition>
          </div>
        </div>

        <div class="flex-column center">
          <label class="form__label" for="phone">Номер телефона</label>
          <input
            v-model="formData.phone"
            class="form__input"
            type="text"
            name="phone"
            @blur="v$.phone.$touch"
          />
          <div class="form__column">
            <transition>
              <small
                v-if="v$.phone.$dirty && v$.phone.isPhone.$invalid"
                class="form__invalid"
                >Некорректный формат телефона
              </small>
            </transition>
          </div>
        </div>
      </fieldset>

      <div class="flex-column center">
        <button class="button" type="submit">Принять</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import { useConfirmation } from '@/js/composables/confirmation';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { isPhone } from '@/js/libs/validation';
import { reactive, computed } from 'vue';
import { useUsersStore } from '@/stores/UsersStore';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

const authenticatedStore = useAuthenticatedStore();
const usersStore = useUsersStore();
const { isDialogOpen, confirmation } = useConfirmation();
const props = defineProps({
  target: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edited', 'close']);

const formData = reactive({
  ...props.target,
});

const rules = {
  login: { required, minLength: minLength(5) },
  fullName: {},
  email: { email },
  phone: { isPhone },
  password: { required, minLength: minLength(5) },
  role: { required },
};

const v$ = useVuelidate(rules, formData);

const ROLE = ['Неавторизованный пользователь', 'Пользователь', 'Администратор'];

const changedUser = computed(() => {
  return {
    login: formData.login,
    id: formData.id,
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    role: formData.role,
  };
});

function editUser() {
  if (v$.value.$invalid) {
    v$.value.$touch();
  }
  usersStore.EDIT_USER(changedUser.value);
  if (changedUser.value.id === authenticatedStore.AUTH.id) {
    authenticatedStore.UPDATE_AUTHENTICATED(changedUser.value);
  }
  emit('edited');
  emit('close');
}
</script>
