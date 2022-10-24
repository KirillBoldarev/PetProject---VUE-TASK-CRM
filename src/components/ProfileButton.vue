<template>
  <button @click="openModal" class="button">Профиль пользователя</button>
  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <profile-form
        @close="closeModal"
        :userList="userList"
        :taskList="taskList"
      ></profile-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ProfileForm from "@/components/ProfileForm.vue";

export default {
  name: "ProfileButton",
  components: { Modal, ProfileForm },

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
      isModalOpen: false,
    };
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
    },
  },
  computed: {

  },
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
