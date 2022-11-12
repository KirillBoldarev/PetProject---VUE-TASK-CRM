<template>
  <section id="registrationForm" class="form__container">
    <h2 class="form__title">Регистрация пользователя!</h2>
    <strong> Введите ваши персональные данные :</strong>
    <form class="form__body" @submit.prevent="this.registerUser">
      <div class="form__group">
        <div class="form__row">
          <label class="form__label" for="firstName">Имя</label>
          <input
            @blur="v$.firstName.$touch"
            v-tooltip.right="'Введите имя'"
            v-model="firstName"
            class="form__input"
            type="text"
            name="firstName"
          />
        </div>
        <div class="row">
          <transition>
            <small
              v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </transition>
        </div>
      </div>

      <div class="form__group">
        <div class="form__row">
          <label class="form__label" for="secondName">Фамилия</label>
          <input
            @blur="v$.secondName.$touch"
            v-tooltip.right="'Введите фамилию'"
            v-model="secondName"
            class="form__input"
            type="text"
            name="secondName"
          />
        </div>
        <div class="form__row">
          <transition>
            <small
              v-if="v$.secondName.$dirty && v$.secondName.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </transition>
        </div>
      </div>

      <div class="form__group">
        <div class="form__row">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            @blur="v$.email.$touch"
            v-tooltip.right="'Введите электронную почту'"
            v-model="email"
            class="form__input"
            type="email"
            name="email"
          />
        </div>
        <div class="form__column">
          <transition-group>
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
          </transition-group>
        </div>
      </div>

      <div class="form__group">
        <div class="form__row">
          <label class="form__label" for="phone">Номер телефона</label>
          <input
            @blur="v$.phone.$touch"
            v-tooltip.right="'Введите номер мобильного телефона'"
            v-model="phone"
            class="form__input"
            type="text"
            name="phone"
          />
        </div>
        <div class="form__column">
          <transition-group>
            <small
              v-if="v$.phone.$dirty && v$.phone.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
            <small
              v-else-if="v$.phone.$dirty && v$.phone.isPhone.$invalid"
              class="form__invalid"
              >Некорректный формат телефона
            </small>
          </transition-group>
        </div>
      </div>

      <div class="form__group">
        <div class="form__row">
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
              >Введите не менее {{ v$.password.minLength.$params.min }} символов
            </small>
          </transition-group>
        </div>
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">Зарегистрироваться!</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPhone } from "@/js/validation";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      firstName: "",
      secondName: "",
      email: "",
      phone: "",
      password: "",
    };
  },
  validations() {
    return {
      firstName: { required },
      secondName: { required },
      email: {
        required,
        email,
      },
      phone: { required, isPhone },
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
    document.addEventListener("keypress", this.registerUserOnKeypress);
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.registerUserOnKeypress);
  },
  methods: {
    registerUser() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$store.commit("createUser", this.newUser);
      this.$store.commit("authentication", this.newUser);
      this.$emit("close");
    },

    registerUserOnKeypress(event) {
      if (event.key === "Enter") {
        this.registerUser;
      }
    },
  },

  computed: {
    newUser() {
      return {
        firstName: this.firstName,
        secondName: this.secondName,
        email: this.email,
        phone: this.phone,
        password: this.password,
        id: Math.random().toString(36).substring(2, 7),
        role: "Администратор",
      };
    },
  },
};
</script>
