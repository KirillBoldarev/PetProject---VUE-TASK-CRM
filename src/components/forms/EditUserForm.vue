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
        :isDialogOpen="isDialogOpen"
        @confirm="this.editUser"
        @close="isDialogOpen = false"
      ></confirm-dialog>

      <div
        v-if="this.$store.getters.GET_AUTH.role === 'Администратор'"
        class="flex-column center"
      >
        <label class="form__label" for="email"
          >Выберите роль пользователя:</label
        >
        <select class="form__select" v-model="role" name="role" id="role">
          <option
            class="form__option"
            v-for="role in this.$options.ROLE"
            :key="role"
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
            @blur="v$.login.$touch"
            v-model="login"
            class="form__input"
            type="text"
            name="login"
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
            @blur="v$.password.$touch"
            v-model="password"
            class="form__input"
            type="password"
            name="password"
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
            @blur="v$.firstName.$touch"
            v-model="firstName"
            class="form__input"
            type="firtstName"
            name="firstName"
          />
        </div>

        <div class="flex-column center">
          <label class="form__label" for="secondName">Фамилия</label>
          <input
            @blur="v$.secondName.$touch"
            v-model="secondName"
            class="form__input"
            type="text"
            name="secondName"
          />
        </div>
      </fieldset>

      <fieldset class="flex-row center form__block">
        <legend class="form__title">Контакты</legend>
        <div class="flex-column center">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            @blur="v$.email.$touch"
            v-model="email"
            class="form__input"
            type="email"
            name="email"
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
            @blur="v$.phone.$touch"
            v-model="phone"
            class="form__input"
            type="text"
            name="phone"
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
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPhone } from "@/js/validation";

export default {
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],
  name: "EditUserForm",

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      //Get all keys from target(user) object
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

  ROLE: ["Неавторизованный пользователь", "Пользователь", "Администратор"],

  props: {
    target: {
      type: Object,
      required: true,
    },
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  emits:['edited', 'close'],

  created() {},
  methods: {
    editUser() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$store.commit("EDIT_USER", this.changedData);
      this.$emit("edited");
      this.$emit("close");
    },
  },

  computed: {
    changedData() {
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
