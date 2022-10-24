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

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-block;
  font-family: Arial, Helvetica, FreeSans, "Liberation Sans", "Nimbus Sans L",
    sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  width: 100px;
  height: 50px;
  color: rgb(245, 245, 245);
  text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  user-select: none;
  outline: none;
  border: none;
  border-radius: 3px;
  background: #0c9c0d linear-gradient(#82d18d, #0c9c0d);
  box-shadow: inset #72de26 0 -1px 1px, inset 0 1px 1px #98ff98,
    #3caa3c 0 0 0 1px, rgba(0, 0, 0, 0.3) 0 2px 5px;
  -webkit-animation: pulsate 1.2s linear infinite;
  animation: pulsate 1.2s linear infinite;

  &:hover {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    cursor: pointer;
  }

  &:active {
    top: 1px;
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3), 0 0 5px #ffd, 0 0 8px #fff;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.3), 0 1px 1px #fff,
      inset 0 1px 2px rgba(0, 0, 0, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05);
  }
}

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
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
}
</style>
