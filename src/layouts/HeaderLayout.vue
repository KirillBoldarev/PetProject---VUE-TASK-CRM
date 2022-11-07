<template>
  <header class="header">
    <div class="header__logo"></div>
    <div class="header__column">
      <h2 class="header__title" v-if="this.$store.getters.isAuth === false">
        Приветствую! Прошу пройти авторизацию!
      </h2>
      <h2 v-else class="header__title">
        Приветствую ,
        {{ this.$store.getters.authenticatedUser.firstName }} !
      </h2>

      <div
        class="header__navigation"
        v-if="this.$store.getters.isAuth === true"
      >
        <router-link
          class="header__link"
          v-for="link in headerLinks"
          :key="link.name"
          :to="link.url"
          >{{ link.name }}</router-link
        >
      </div>
    </div>

    <div class="header__row" v-if="this.$store.getters.isAuth === true">
      <button-with-modal-form label="Профиль пользователя">
        <template #formSlot="{ closeModal }"
          ><profile-form
            @close="closeModal"
            :userList="userList"
            :taskList="taskList"
          >
          </profile-form
        ></template>
      </button-with-modal-form>

      <logout-action></logout-action>
    </div>

    <div class="header__row" v-if="this.$store.getters.isAuth === false">
      <button-with-modal-form label="Войти">
        <template #formSlot="{ closeModal }">
          <login-form @close="closeModal" :userList="userList"></login-form>
        </template>
      </button-with-modal-form>

      <button-with-modal-form label="Зарегистрироваться">
        <template #formSlot="{ closeModal }">
          <regisitration-form @close="closeModal" :userList="userList">
          </regisitration-form>
        </template>
      </button-with-modal-form>
    </div>
  </header>
</template>

<script>
import Modal from "@/components/Modal.vue";
import LogoutAction from "@/components/actions/LogoutAction.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import ProfileForm from "@/components/forms/ProfileForm.vue";
import RegisitrationForm from "@/components/forms/RegistrationForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  components: {
    Modal,
    LogoutAction,
    ButtonWithModalForm,
    ProfileForm,
    RegisitrationForm,
    LoginForm,
    ConfirmDialog,
  },
  name: "header-layout",

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
  data() {
    return {
      headerLinks: [
        { name: "Главная", url: "/" },
        { name: "Управление задачами", url: "/tasks" },
        { name: "Список пользователей", url: "/users" },
      ],
    };
  },

  methods: {},
};
</script>
