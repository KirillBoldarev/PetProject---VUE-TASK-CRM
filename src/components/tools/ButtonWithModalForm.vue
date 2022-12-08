<template>
  <template v-if="this.image">
    <img
      v-tooltip.bottom="tooltip"
      @click="openModal"
      :src="this.image"
      :class="iconClass"
      alt=""
    />
    <modal-window :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :closeModal="closeModal"></slot>
      </template>
    </modal-window>
  </template>

  <button
    v-tooltip.bottom="tooltip"
    v-else-if="this.label"
    class="button"
    @click="openModal"
  >
    {{ label }}
    <modal-window :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :closeModal="closeModal"></slot>
      </template>
    </modal-window>
  </button>
</template>

<script>
import ModalWindow from "@/components/tools/ModalWindow.vue";

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
    iconClass: {
      type: String,
      required: false,
    },
    tooltip: {
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
