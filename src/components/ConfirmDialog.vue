<template>
  <modal-window :isOpen="isDialogOpen" @close="close">
    <template #ModalSlot>
      <section id="confirmForm" class="form__container">
        <h2 class="form__title">Вы уверены ?</h2>
        <div class="flex-row center">
          <button @click="confirm" class="button--accept">Да</button>
          <button @click="close" class="button--decline">Нет</button>
        </div>
      </section>
    </template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";
export default {
  components: { ModalWindow },
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close", "confirm"],
  data() {
    return {};
  },

  methods: {
    confirm() {
      this.$emit("confirm");
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
