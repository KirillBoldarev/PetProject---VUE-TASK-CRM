<template>
  <header class="header">
    <div class="header__logo"></div>
    <div
      v-if="this.$store.getters.checkForAuthenticate === false"
      class="requirement"
    >
      Приветствую! Прошу пройти авторизацию!
    </div>
    <div v-else class="header__navigation">
      <router-link
        class="header__link"
        v-for="link in headerLinks"
        :key="link.name"
        :to="link.url"
        >{{ link.name }}</router-link
      >
    </div>
    <div class="header__buttonbox">
      <div v-if="this.$store.getters.checkForAuthenticate === true">
        <div class="column">
          <div class="header__greeting">
            Приветствую ,
            {{ this.$store.getters.authenticatedUser.firstName }} !
          </div>
          <div class="row">
            <profile-button
              :userList="userList"
              :taskList="taskList"
            ></profile-button>
            <logout-button></logout-button>
          </div>
        </div>
      </div>
      <div v-if="this.$store.getters.checkForAuthenticate === false">
        <authorization-buttons :userList="userList"></authorization-buttons>
      </div>
    </div>
  </header>
</template>

<script>
import Modal from "@/components/Modal.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import ProfileButton from "@/components/ProfileButton.vue";
import AuthorizationButtons from "@/components/AuthorizationButtons.vue";

export default {
  components: { Modal, LogoutButton, ProfileButton, AuthorizationButtons },
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

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: rgb(175, 165, 165);
  height: 100px;

  &__navigation {
    display: flex;
    flex-direction: row;
    gap: 30px;
    padding: 10px;
    text-align: center;
    justify-content: center;
  }
  &__link {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  &__buttonbox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &--guest {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }

    &--authenticated {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
  }
  &__greeting {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
