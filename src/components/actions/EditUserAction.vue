<template>
  <img @click="openModal" class="icon" src="@/icons/edit.png" alt="" />

  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <edit-user-form
        @close="closeModal"
        :target="target"
        :userList="userList"
        :taskList="taskList"
      ></edit-user-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import EditUserForm from '@/components/forms/EditUserForm.vue'

export default {
  name: "EditUserButton",
  components: {
    Modal,
    EditUserForm,
  },
  props: {
    target: {
      type: Object,
      required: true,
    },
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
