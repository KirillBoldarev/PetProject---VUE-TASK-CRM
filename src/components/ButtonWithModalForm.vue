<template>
  <template v-if="this.image">
    <img @click="openModal" :src="this.image" class="icon" alt="" />
    <modal-window :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :closeModal="closeModal"></slot>
      </template>
    </modal-window>
  </template>

  <button v-else-if="this.label" class="button" @click="openModal">
    {{ label }}
    <modal-window :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :closeModal="closeModal"></slot>
      </template>
    </modal-window>
  </button>
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  name: "ButtonWithModalForm",
  components: { ModalWindow },
  props: {
    label: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
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
