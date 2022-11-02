<template>
  <section id="EditUserForm" class="form__container">
    <h3 class="form__titile">Ваши персональные данные:</h3>
    <form class="form__body" @submit.prevent="this.editUser">
      <div class="form__group">
        <label class="form__label" for="email"
          >Выберите роль пользователя:</label
        >
        <select v-model="role" name="role" id="role">
          <option v-for="role in this.$options.ROLE" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="form__row">
        <div class="form__group">
          <label class="form__label" for="email">Имя</label>
          <input
            @blur="v$.firstName.$touch"
            v-model="firstName"
            class="form__input"
            type="firtstName"
            name="firstName"
          />
          <div class="form__row">
            <small
              v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label" for="secondName">Фамилия</label>
          <input
            @blur="v$.secondName.$touch"
            v-model="secondName"
            class="form__input"
            type="text"
            name="secondName"
          />
          <div class="form__row">
            <small
              v-if="v$.secondName.$dirty && v$.secondName.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </div>
        </div>
      </div>

      <div class="form__row">
        <div class="form__group">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            @blur="v$.email.$touch"
            v-model="email"
            class="form__input"
            type="email"
            name="email"
          />
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
          <label class="form__label" for="phone">Номер телефона</label>
          <input
            @blur="v$.phone.$touch"
            v-model="phone"
            class="form__input"
            type="text"
            name="phone"
          />
          <div class="form__row">
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
          </div>
        </div>
      </div>

      <div class="form__group">
        <label class="form__label" for="password">Пароль</label>
        <input
          @blur="v$.password.$touch"
          v-model="password"
          class="form__input"
          type="password"
          name="password"
        />
        <div class="form__row">
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
        </div>
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">Принять</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPhone } from "@/js/validation";

export default {
  components: {},
  name: "EditUserForm",

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      firstName: this.target.firstName,
      secondName: this.target.secondName,
      email: this.target.email,
      phone: this.target.phone,
      password: this.target.password,
      id: this.target.id,
      role: this.target.role,
    };
  },

  validations() {
    return {
      firstName: { required },
      secondName: { required },
      email: { required, email },
      phone: { required, isPhone },
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

  created() {},
  methods: {
    editUser() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$store.commit("editUser", this.changedData);
      if (this.id === this.$store.getters.authenticatedUser.id) {
        this.$store.commit("updateAuthenticated");
      }
      this.$emit("close");
    },
  },

  computed: {
    changedData() {
      return {
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
