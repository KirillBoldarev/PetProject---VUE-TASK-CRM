<template>
  <button @click="openModal()" class="button">Выйти из системы</button>
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
      this.$store.commit("logoutCurrentUser");
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.button {
  font-family: Hack, monospace;
  background: #0f0f6d;
  color: #ffffff;
  cursor: pointer;
  font-size: 1em;
  padding: 0.75rem;
  border: 0;
  transition: all 0.5s;
  border-radius: 10px;
  width: auto;
  position: relative;

  &::after {
    content: "";
    font-family: "Font Awesome 5 Pro";
    font-weight: 400;
    position: absolute;
    left: 85%;
    top: 31%;
    right: 5%;
    bottom: 0;
    opacity: 0;
  }

  &:hover {
    background: #2b2bff;
    transition: all 0.5s;
    border-radius: 10px;
    box-shadow: 0px 6px 15px #0000ff61;
    padding: 0.75rem 1.75rem 0.75rem 0.75rem;

    &::after {
      opacity: 1;
      transition: all 0.5s;
    }
  }
}
</style>
