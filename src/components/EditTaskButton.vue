<template>
  <img @click="openModal" class="icon" src="@/icons/edit.png" alt="" />

  <modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <template #ModalSlot="{ closeModal }">
      <edit-task-form
        @close="closeModal"
        :target="this.target"
        :userList="userList"
        :taskList="taskList"
      ></edit-task-form>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import EditTaskForm from "@/components/EditTaskForm.vue";

export default {
  components: {
    Modal,
    EditTaskForm,
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


<style lang="scss" scoped>
.icon {
  font-size: 34px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  text-decoration: none;
  cursor: pointer;

  &--mini {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
</style>
