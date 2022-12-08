<template>
  <modal-window :is-open="isDialogOpen" @close="close">
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

<script>
import ModalWindow from '@/components/tools/ModalWindow.vue';
export default {
  components: { ModalWindow },
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'confirm'],
  data() {
    return {};
  },

  methods: {
    confirm() {
      this.$emit('confirm');
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
