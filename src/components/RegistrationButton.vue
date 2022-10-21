<template>
  <button @click="openModal" class="button">Зарегистрироваться</button>
  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <registration-form @close="closeModal"></registration-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
export default {
  components: { Modal, RegistrationForm },
  data() {
    return {
      isModalOpen: false,
    };
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: Cyber;
  src: url("https://assets.codepen.io/605876/Blender-Pro-Bold.otf");
  font-display: swap;
}

* {
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  font-family: "Cyber", sans-serif;
  background: linear-gradient(90deg, #f5ed00 70%, #e6de00 70%), #fff700;
}

body .cybr-btn + .cybr-btn {
  margin-top: 2rem;
}

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
