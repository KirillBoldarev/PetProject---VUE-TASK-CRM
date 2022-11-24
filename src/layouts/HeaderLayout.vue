<template>
  <header class="header">
    <div class="header__logo"></div>
    <div class="flex-column center">
      <strong class="header__title" v-if="this.$store.getters.isAuth === false">
        Приветствую! Прошу пройти авторизацию!
      </strong>
      <strong v-if="this.$store.getters.isAuth === true" class="header__title">
        Приветствую , 	&nbsp;
        <span v-if="this.$store.getters.getAuth.firstName">{{
          this.$store.getters.getAuth.firstName
        }}</span
        ><span v-if="!this.$store.getters.getAuth.firstName">{{
          this.$store.getters.getAuth.login
        }}</span>
        !
      </strong>

      <div
        class="header__navigation"
        v-if="this.$store.getters.isAuth === true"
      >
        <router-link
          class="header__link"
          v-for="link in headerLinks"
          :key="link.name"
          :to="link.url"
        >
          <img class="icon--mini" :src="getImgUrl(link.icon)" />{{
            link.name
          }}</router-link
        >
      </div>
    </div>

    <div class="flex-row flex-end" v-if="this.$store.getters.isAuth === true">
      <button class="button" @click="this.$router.push('/profile')">
        Личный кабинет
      </button>
      <!-- <button-with-modal-form label="Профиль пользователя">
        <template #formSlot="{ closeModal }"
          ><profile-form
            @close="closeModal"
            :userList="userList"
            :taskList="taskList"
          >
          </profile-form
        ></template>
      </button-with-modal-form> -->
      <logout-action></logout-action>
    </div>

    <div class="flex-row flex-end" v-if="this.$store.getters.isAuth === false">
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
import ProfileForm from "@/components/forms/ProfileForm.vue";
import RegisitrationForm from "@/components/forms/RegistrationForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";

export default {
  components: {
    ButtonWithModalForm,
    ProfileForm,
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
      return require(`../icons/` + item);
    },
  },
};
</script>
