<template>
  <section id="profileForm" class="container">
    <div class="header">
      <h2 class="header__title">Профиль пользователя</h2>
      <div class="header__tooltipBox">
        <div class="header__tooltipItem">
          <img
            @click="this.editMode = !this.editMode"
            class="icon"
            src="@/icons/edit.png"
            alt=""
          />
          <span> Редактировать</span>
        </div>
        <!--         <div class="header__tooltipItem">
          <img
            @click="this.taskListMode = !this.taskListMode"
            class="icon"
            src="@/icons/task.png"
            alt=""
          />
          <span> Задачи</span>
        </div> -->
      </div>
    </div>

    <div class="main">
      <h3>Ваши персональные данные:</h3>
      <form class="form" @submit.prevent="this.editUser">
        <div class="row">
          <div class="form__group">
            <label class="form__label" for="firtstName">Имя</label>
            <input
              @blur="v$.firstName.$touch"
              v-model="firstName"
              class="form__input"
              type="firtstName"
              name="firstName"
              :disabled="editMode === false"
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
              :disabled="editMode === false"
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
              :disabled="editMode === false"
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
              :disabled="editMode === false"
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
            :disabled="editMode === false"
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
import { isPhone } from "@/js/validation";

export default {
  components: {},
  name: "ProfileForm",

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      firstName: this.$store.getters.authenticatedUser.firstName,
      secondName: this.$store.getters.authenticatedUser.secondName,
      email: this.$store.getters.authenticatedUser.email,
      phone: this.$store.getters.authenticatedUser.phone,
      password: this.$store.getters.authenticatedUser.password,
      id: this.$store.getters.authenticatedUser.id,

      isOpenTaskList: false,
      editMode: false,
      taskListMode: false,
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
      this.$store.commit("updateAuthenticated");
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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 750px;
}

.header {
  display: flex;
  flex: 0 0 20%;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;

  &__tooltipBox {
    display: flex;
    flex-direction: row;
    flex: 0 0 auto;
    gap: 20px;
  }

  &__tooltipItem {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 1px solid gray;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
}

.main {
  display: flex;
  flex-direction: column;
  flex: 0 0 20%;
  gap: 20px;
  overflow-y: scroll;
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
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.icon {
  font-size: 34px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  text-decoration: none;
  cursor: pointer;

  &--mini {
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
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
