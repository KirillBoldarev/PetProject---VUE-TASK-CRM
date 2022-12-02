<template>
  <header class="header">
    <div class="header__logo">
      <img  class="header__logo--icon" src="@/icons/modalBackground.png" alt="">
    </div>
    <div class="flex-column center">
      <strong
        class="header__title"
        v-if="this.$store.getters.IS_AUTH === false"
      >
        Приветствую! Прошу пройти авторизацию!
      </strong>
      <strong v-if="this.$store.getters.IS_AUTH === true" class="header__title">
        Приветствую,  &nbsp;  
        <strong v-if="this.$store.getters.GET_AUTH.firstName">{{
          this.$store.getters.GET_AUTH.firstName
        }}</strong
        ><span v-if="!this.$store.getters.GET_AUTH.firstName">{{
          this.$store.getters.GET_AUTH.login
        }}</span>
        !
      </strong>

      <div
        class="header__navigation"
        v-if="this.$store.getters.IS_AUTH === true"
      >
        <router-link
          class="header__link"
          v-for="link in headerLinks"
          :key="link.name"
          :to="link.url"
        >
          <img
            v-tooltip.bottom="link.name"
            class="icon"
            :src="getImgUrl(link.icon)"
          />
          <span>{{ link.name }}</span></router-link
        >
      </div>
    </div>

    <div class="flex-column center" v-if="this.$store.getters.IS_AUTH === true">
      <button class="button" @click="this.$router.push('/profile')">
        Личный кабинет
      </button>
      <logout-action></logout-action>
    </div>

    <div
      class="flex-column center"
      v-if="this.$store.getters.IS_AUTH === false"
    >
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
import LogoutAction from "@/components/actions/LogoutAction.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import RegisitrationForm from "@/components/forms/RegistrationForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";

export default {
  components: {
    ButtonWithModalForm,
    RegisitrationForm,
    LoginForm,
    LogoutAction,
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
        { name: "Главная", url: "/", icon: "home.png" },
        {
          name: "Управление задачами",
          url: "/tasks",
          icon: "task.png",
        },
        {
          name: "Список пользователей",
          url: "/users",
          icon: "user.png",
        },
      ],
    };
  },

  methods: {
    getImgUrl(item) {
      return require(`@/icons/` + item);
    },
  },
};
</script>
