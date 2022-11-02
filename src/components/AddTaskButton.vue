<template>
  <img @click="openModal" src="@/icons/plus.png" class="icon" alt="" />
  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <add-task-form
        @close="closeModal"
        :target="this.target"
        :taskList="taskList"
        :userList="userList"
      ></add-task-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import AddTaskForm from "@/components/AddTaskForm.vue";

export default {
  name: "AddTaskButton",
  components: {
    Modal,
    AddTaskForm,
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
};
</script>
