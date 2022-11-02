<template>
  <button @click="openModal()" class="button--header">Выйти из системы</button>
  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <confirm-form @close="closeModal" @confirm="logout"></confirm-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ConfirmForm from "@/components/ConfirmForm.vue";
export default {
  components: { Modal, ConfirmForm },

  data() {
    return {
      isModalOpen: false,
    };
  },

  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
};
</script>
