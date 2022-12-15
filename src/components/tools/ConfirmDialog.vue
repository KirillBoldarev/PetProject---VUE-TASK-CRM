<template>
  <modal-window :isOpen="props.isDialogOpen" @close="close">
    <template #ModalSlot>
      <section id="confirmForm" class="form__container">
        <h2 class="form__title">Вы уверены ?</h2>
        <div class="flex-row center">
          <button class="button--accept" @click="confirm">Да</button>
          <button class="button--decline" @click="close">Нет</button>
        </div>
      </section>
    </template>
  </modal-window>
</template>

<script setup>
import ModalWindow from '@/components/tools/ModalWindow.vue';

const props = defineProps({
  isDialogOpen: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(['close', 'confirm']);

function confirm() {
  emits('confirm');
  emits('close');
}
function close() {
  emits('close');
}
</script>
