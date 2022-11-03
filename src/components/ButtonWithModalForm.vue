<template>
  <button class="button--header" @click="openModal">
    {{ label }}
    <modal :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :closeModal="closeModal"></slot>
      </template>
    </modal>
  </button>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  name: "ButtonWithModalForm",
  components: { Modal },

  props: {
    target: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    label: {
      type: String,
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
    closeModal() {
      this.isModalOpen = false;
    },
  },

  computed: {},
};
</script>
