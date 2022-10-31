<template>
  <section id="registrationForm" class="container-form">
    <h2>Регистрация пользователя!</h2>
    <p>Введите ваши персональные данные:</p>
    <form class="form" @submit.prevent="this.registerUser()">
      <div class="form__group">
        <div class="row">
          <label class="form__label" for="firstName">Имя</label>
          <input
            @blur="v$.firstName.$touch"
            v-model="firstName"
            class="form__input"
            type="text"
            name="firstName"
          />
        </div>
        <div class="row">
          <small
            v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
            class="invalidData"
            >Поле обязательно для заполнения
          </small>
        </div>
      </div>

      <div class="form__group">
        <div class="row">
          <label class="form__label" for="secondName">Фамилия</label>
          <input
            @blur="v$.secondName.$touch"
            v-model="secondName"
            class="form__input"
            type="text"
            name="secondName"
          />
        </div>
        <div class="row">
          <small
            v-if="v$.secondName.$dirty && v$.secondName.required.$invalid"
            class="invalidData"
            >Поле обязательно для заполнения
          </small>
        </div>
      </div>

      <div class="form__group">
        <div class="row">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            @blur="v$.email.$touch"
            v-model="email"
            class="form__input"
            type="email"
            name="email"
          />
        </div>
        <div class="row">
          <small
            v-if="v$.email.$dirty && v$.email.required.$invalid"
            class="invalidData"
            >Поле обязательно для заполнения
          </small>
          <small
            v-else-if="v$.email.$dirty && v$.email.email.$invalid"
            class="invalidData"
            >Некорректный формат электронной почты
          </small>
          <small
            v-else-if="v$.email.$dirty && !v$.email.isUniqueEmail.$invalid"
            class="invalidData"
            >Данный Email уже используется
          </small>
        </div>
      </div>

      <div class="form__group">
        <div class="row">
          <label class="form__label" for="phone">Номер телефона</label>
          <input
            @blur="v$.phone.$touch"
            v-model="phone"
            class="form__input"
            type="text"
            name="phone"
          />
        </div>
        <div class="row">
          <small
            v-if="v$.phone.$dirty && v$.phone.required.$invalid"
            class="invalidData"
            >Поле обязательно для заполнения
          </small>
          <small
            v-else-if="v$.phone.$dirty && v$.phone.isPhone.$invalid"
            class="invalidData"
            >Некорректный формат телефона
          </small>
        </div>
      </div>

      <div class="form__group">
        <div class="row">
          <label class="form__label" for="password">Пароль</label>
          <input
            @blur="v$.password.$touch"
            v-model="password"
            class="form__input"
            type="password"
            name="password"
          />
        </div>
        <div class="row">
          <small
            v-if="v$.password.$dirty && v$.password.required.$invalid"
            class="invalidData"
            >Поле обязательно для заполнения
          </small>
          <small
            v-if="v$.password.$dirty && v$.password.minLength.$invalid"
            class="invalidData"
            >Введите не менее {{ v$.password.minLength.$params.min }} символов
          </small>
        </div>
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">Зарегистрироваться!</button>
        <a @click="this.$emit('changeToLogin')" href="#" class="switch"
          >У меня уже есть аккаунт!</a
        >
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPhone, isUniqueEmail } from "@/js/validation";

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
        isUniqueEmail: isUniqueEmail(this.userList, this.email),
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
      let newUser = this.formData;
      this.userList.push(newUser);
      this.$store.commit("updateUserList", this.userList);
      this.$store.commit("authenticateCurrentUser", newUser);
      this.$emit("close");
    },

    registerUserOnKeypress(event) {
      if (event.key === "Enter") {
        this.registerUser;
      }
    },
  },

  computed: {
    formData() {
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

<style lang="scss" scoped>
.container-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

h2 {
  text-align: center;
  margin: 5px;
}
p {
  margin: 0px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  &__group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  &__input {
    padding: 5px;
  }
  &__button {
    padding: 15px;
    font-size: 16px;
  }
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.invalidData {
  color: red;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
