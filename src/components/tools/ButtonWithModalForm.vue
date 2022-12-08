<template>
  <template v-if="image">
    <img
      v-tooltip.bottom="tooltip"
      :src="image"
      :class="iconClass"
      alt=""
      @click="openModal"
    />
    <modal-window :is-open="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :close-modal="closeModal" />
      </template>
    </modal-window>
  </template>

  <button
    v-else-if="label"
    v-tooltip.bottom="tooltip"
    class="button"
    @click="openModal"
  >
    {{ label }}
    <modal-window :is-open="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :close-modal="closeModal" />
      </template>
    </modal-window>
  </button>
</template>

<script>
import ModalWindow from '@/components/tools/ModalWindow.vue';

export default {
  name: 'ButtonWithModalForm',
  components: { ModalWindow },
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    image: {
      type: String,
      required: false,
      default: '',
    },
    iconClass: {
      type: String,
      required: false,
      default: '',
    },
    tooltip: {
      type: String,
      required: false,
      default: '',
    },
  },

  data() {
    return {
      isModalOpen: false,
    };
  },

  computed: {},

  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
