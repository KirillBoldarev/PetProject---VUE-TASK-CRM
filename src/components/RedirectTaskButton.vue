<template>
  <img @click="openModal" class="icon" src="@/icons/redirect.png" alt="" />

  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <redirect-task-form
        @close="closeModal"
        :target="this.target"
        :taskList="taskList"
        :userList="userList"
      ></redirect-task-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import RedirectTaskForm from "@/components/RedirectTaskForm.vue";

export default {
  components: {
    Modal,
    RedirectTaskForm,
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
