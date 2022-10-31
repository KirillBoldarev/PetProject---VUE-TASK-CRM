<template>
  <section id="EditUserForm" class="container">
    <div class="main">
      <h3>Ваши персональные данные:</h3>
      <form class="form" @submit.prevent="this.updateUser">
        <div class="form__group">
          <label class="form__label" for="email"
            >Выберите роль пользователя:</label
          >
          <select v-model="role" name="role" id="role">
            <option
              v-for="role in this.$options.ROLE"
              :key="role"
              :value="role"
            >
              {{ role }}
            </option>
          </select>
        </div>
        <div class="row">
          <div class="form__group">
            <label class="form__label" for="email">Имя</label>
            <input
              @blur="v$.firstName.$touch"
              v-model="firstName"
              class="form__input"
              type="firtstName"
              name="firstName"
            />
            <div class="row">
              <small
                v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
                class="invalidData"
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
            <div class="row">
              <small
                v-if="v$.secondName.$dirty && v$.secondName.required.$invalid"
                class="invalidData"
                >Поле обязательно для заполнения
              </small>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form__group">
            <label class="form__label" for="email">Электронная почта</label>
            <input
              @blur="v$.email.$touch"
              v-model="email"
              class="form__input"
              type="email"
              name="email"
            />
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
                v-else-if="
                  v$.email.$dirty && !v$.email.isUniqueTargetEmail.$invalid
                "
                class="invalidData"
                >Данный Email уже используется
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
          <button class="form__button" type="submit">Принять</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPhone, isUniqueTargetEmail } from "@/js/validation";

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
      email: { required, email, isUniqueTargetEmail },
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
    updateUser() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.userList.forEach((user) => {
        if (user.id === this.id) {
          user.firstName = this.firstName;
          user.secondName = this.secondName;
          user.email = this.email;
          user.phone = this.phone;
          user.password = this.password;
          user.role = this.role;
        }
      });
      if (this.id === this.$store.getters.authenticatedUser.id) {
        this.$store.commit("updateAuthUser");
      }
      this.$store.commit("updateUserList", this.userList);
      this.$emit("close");
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 750px;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 0 0 20%;
  gap: 20px;
  padding: 5px;
  max-height: 600px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  max-height: 100%;

  &__group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  &__invalid {
    color: red;
    text-decoration: underline;
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
