<template>
  <button @click="openModal" class="button--header">
    Профиль пользователя
  </button>
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
  computed: {},
};
</script>
