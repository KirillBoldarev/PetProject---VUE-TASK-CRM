<template>
  <section id="EditUserForm" class="form__container">
    <form class="form__body" @submit.prevent="confirmation">
      <h2 class="form__title">
        Данные пользователя:
        <strong v-if="!target.firstName">{{ target.login }}</strong>
        <strong v-if="target.firstName"
          >{{ target.firstName }} {{ target.secondName }}</strong
        >
      </h2>
      <confirm-dialog
        :is-dialog-open="isDialogOpen"
        @confirm="editUser"
        @close="isDialogOpen = false"
      />

      <div
        v-if="authenticatedStore.GET_AUTH.role === 'Администратор'"
        class="flex-column center"
      >
        <label class="form__label" for="email"
          >Выберите роль пользователя:</label
        >
        <select id="role" v-model="role" class="form__select" name="role">
          <option
            v-for="role in $options.ROLE"
            :key="role"
            class="form__option"
            :value="role"
          >
            {{ role }}
          </option>
        </select>
      </div>

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Аутентификация</legend>
        <div class="flex-column center">
          <label class="form__label" for="login">Логин</label>
          <input
            v-model="login"
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
            v-model="password"
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
          <label class="form__label" for="email">Имя</label>
          <input
            v-model="firstName"
            class="form__input"
            type="firtstName"
            name="firstName"
            @blur="v$.firstName.$touch"
          />
        </div>

        <div class="flex-column center">
          <label class="form__label" for="secondName">Фамилия</label>
          <input
            v-model="secondName"
            class="form__input"
            type="text"
            name="secondName"
            @blur="v$.secondName.$touch"
          />
        </div>
      </fieldset>

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Контакты</legend>
        <div class="flex-column center">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            v-model="email"
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
            v-model="phone"
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

<script>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { isPhone } from '@/js/libs/validation';

import { useUsersStore } from '@/stores/UsersStore';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { mapStores } from 'pinia';

export default {
  name: 'EditUserForm',
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  props: {
    target: {
      type: Object,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  emits: ['edited', 'close'],

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      // Get all keys from target(user) object
      ...this.target,
    };
  },

  validations() {
    return {
      login: { required, minLength: minLength(5) },
      firstName: {},
      secondName: {},
      email: { email },
      phone: { isPhone },
      password: { required, minLength: minLength(5) },
    };
  },

  ROLE: ['Неавторизованный пользователь', 'Пользователь', 'Администратор'],

  created() {},
  methods: {
    editUser() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.usersStore.EDIT_USER(this.changedUser);
      if (this.changedUser.id === this.authenticatedStore.GET_AUTH.id) {
        this.authenticatedStore.UPDATE_AUTHENTICATED(this.changedUser);
      }
      this.$emit('edited');
      this.$emit('close');
    },
  },

  computed: {
    ...mapStores(useUsersStore, useAuthenticatedStore),
    changedUser() {
      return {
        login: this.login,
        id: this.id,
        firstName: this.firstName,
        secondName: this.secondName,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: this.role,
      };
    },
  },
};
</script>
