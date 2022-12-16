<template>
  <template v-if="image">
    <img
      v-tooltip.bottom="tooltip"
      :src="image"
      :class="props.iconClass"
      alt=""
      @click="openModal"
    />
    <modal-window :isOpen="isModalOpen" @close="isModalOpen = false">
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
    <modal-window :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #ModalSlot>
        <slot name="formSlot" :close-modal="closeModal" />
      </template>
    </modal-window>
  </button>
</template>

<script setup>
import ModalWindow from '@/components/tools/ModalWindow.vue';
import { ref } from 'vue';
const props = defineProps({
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
});
const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
}

defineExpose({
  openModal,
  closeModal,
});
</script>
