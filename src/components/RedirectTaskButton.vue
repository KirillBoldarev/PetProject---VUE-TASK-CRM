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
};
</script>

<style lang='scss' scoped>
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
