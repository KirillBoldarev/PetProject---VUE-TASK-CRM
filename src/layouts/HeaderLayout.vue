<template>
  <header class="header">
    <div class="header__logo"></div>
    <div class="header__navigation">
      <router-link
        class="header__link"
        v-for="link in headerLinks"
        :key="link.name"
        :to="link.url"
        >{{ link.name }}</router-link
      >
    </div>
    <button-box :userList="userList" :taskList="taskList"></button-box>
  </header>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ButtonBox from "@/components/ButtonBox.vue";

export default {
  components: { Modal, ButtonBox },
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

  methods: {

  },
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
  &__button {
    position: relative;
    display: inline-block;
    font-size: 90%;
    font-weight: 700;
    color: rgb(209, 209, 217);
    text-decoration: none;
    text-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
    padding: 0.5em 1em;
    outline: none;
    border-radius: 3px;
    background: linear-gradient(rgb(110, 112, 120), rgb(81, 81, 86))
      rgb(110, 112, 120);
    box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset,
      0 3px 5px rgba(0, 1, 6, 0.5), 0 0 1px 1px rgba(0, 1, 6, 0.2);
    transition: 0.2s ease-in-out;

    &:hover:not(:active) {
      background: linear-gradient(rgb(126, 126, 134), rgb(70, 71, 76))
        rgb(126, 126, 134);
    }
    &:active {
      top: 1px;
      background: linear-gradient(rgb(76, 77, 82), rgb(56, 57, 62))
        rgb(76, 77, 82);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.5) inset,
        0 2px 3px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
