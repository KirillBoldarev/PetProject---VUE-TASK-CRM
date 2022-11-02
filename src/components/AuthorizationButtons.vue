<template>
  <button @click="this.registraion" class="button--header">
    Зарегистрироваться
  </button>
  <button @click="this.login" class="button--header">Войти</button>
  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <registration-form
        v-if="this.action === 'registration'"
        @changeToLogin="this.action = 'login'"
        @close="closeModal"
        :userList="userList"
      ></registration-form>
      <login-form
        v-if="this.action === 'login'"
        @changeToRegistration="this.action = 'registration'"
        @close="closeModal"
        :userList="userList"
      ></login-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import LoginForm from "./LoginForm.vue";
export default {
  components: { Modal, RegistrationForm, LoginForm },

  props: {
    userList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isModalOpen: false,
      action: "",
    };
  },

  methods: {
    registraion() {
      this.isModalOpen = true;
      this.action = "registration";
    },
    login() {
      this.isModalOpen = true;
      this.action = "login";
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
};
</script>
