<template>
  <teleport to="#modal">
    <transition>
      <div
        @click="closeModal"
        v-if="isOpen === true"
        class="modal__backdrop"
      >
        <div @click.stop class="modal__body">
          <slot name="ModalSlot" :closeModal="closeModal" :confirm="confirm">
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    document.addEventListener("keydown", this.closeOnKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.closeOnKeydown);
  },
  emits: {
    ok: null,
    close: null,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("ok");
    },
    closeOnKeydown(event) {
      if (this.isOpen === true && event.key === "Escape") {
        this.closeModal();
      }
    },
  },
};
</script>
