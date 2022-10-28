<template>
  <section id="EditUserForm" class="container">
    <div class="main">
      <h3>Ваши персональные данные:</h3>
      <form class="form">
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
            <label
              v-if="this.invalidEmail === false"
              class="form__label"
              for="email"
              >Имя</label
            >
            <input
              v-model="firstName"
              class="form__input"
              type="firtstName"
              name="firstName"
            />
          </div>

          <div class="form__group">
            <label class="form__label" for="secondName">Фамилия</label>
            <input
              v-model="secondName"
              class="form__input"
              type="text"
              name="secondName"
            />
          </div>
        </div>

        <div class="row">
          <div class="form__group">
            <label
              v-if="this.invalidEmail === false"
              class="form__label"
              for="email"
              >Электронная почта</label
            >
            <label
              v-if="this.invalidEmail === true"
              class="form__invalid"
              for="email"
              >Введен некорректный формат электронной почты</label
            >
            <input
              v-model="email"
              class="form__input"
              type="email"
              name="email"
            />
          </div>
          <div class="form__group">
            <label class="form__label" for="phone">Номер телефона</label>
            <input
              v-model="phone"
              class="form__input"
              type="text"
              name="phone"
            />
          </div>
        </div>

        <div class="form__group">
          <label
            v-if="this.invalidPassword === false"
            class="form__label"
            for="password"
            >Пароль</label
          >
          <label
            v-if="this.invalidPassword === true"
            class="form__invalid"
            for="password"
            >Выбран ненадежный пароль!</label
          >
          <input
            v-model="password"
            class="form__input"
            type="password"
            name="password"
          />
        </div>

        <div class="form__group">
          <button
            @click.prevent="this.updateUser"
            class="form__button"
            type="submit"
          >
            Принять
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  name: "EditUserForm",
  data() {
    return {
      firstName: this.target.firstName,
      secondName: this.target.secondName,
      email: this.target.email,
      phone: this.target.phone,
      password: this.target.password,
      id: this.target.id,
      role: this.target.role,
      invalidEmail: false,
      invalidPassword: false,
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
      this.$store.commit("updateUserList", this.userList);
      if (this.id === this.$store.getters.authenticatedUser.id) {
        this.$store.commit("updateAuthUser");
      }
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
    flex-direction: row;
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
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
</style>
