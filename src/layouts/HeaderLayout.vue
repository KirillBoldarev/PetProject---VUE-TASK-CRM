<template>
  <header class="header">
    <div class="header__logo"></div>
    <div class="header__column">
      <h2
        class="header__title"
        v-if="this.$store.getters.checkForAuthenticate === false"
      >
        Приветствую! Прошу пройти авторизацию!
      </h2>
      <h2 v-else class="header__title">
        Приветствую ,
        {{ this.$store.getters.authenticatedUser.firstName }} !
      </h2>

      <div
        class="header__navigation"
        v-if="this.$store.getters.checkForAuthenticate === true"
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

    <div
      class="header__row"
      v-if="this.$store.getters.checkForAuthenticate === true"
    >
      <profile-button
        :userList="userList"
        :taskList="taskList"
      ></profile-button>
      <logout-button></logout-button>
    </div>

    <div
      class="header__row"
      v-if="this.$store.getters.checkForAuthenticate === false"
    >
      <authorization-buttons :userList="userList"></authorization-buttons>
    </div>
  </header>
</template>

<script>
import Modal from "@/components/Modal.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import ProfileButton from "@/components/ProfileButton.vue";
import AuthorizationButtons from "@/components/AuthorizationButtons.vue";
import { Transition } from "vue";

export default {
  components: {
    Modal,
    LogoutButton,
    ProfileButton,
    AuthorizationButtons,
    Transition,
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
