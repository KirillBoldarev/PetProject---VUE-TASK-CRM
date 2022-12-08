<template>
  <teleport to="#modal">
    <transition>
      <div v-if="isOpen" class="modal__backdrop" @click="closeModal">
        <div class="modal__body" @click.stop>
          <div />
          <div class="flex-row center">
            <div class="modal__image" />
            <div class="modal__close">
              <img
                class="icon"
                src="@/assets/icons/remove.png"
                alt=""
                @click="closeModal"
              />
            </div>
          </div>
          <slot
            class="modal__slot"
            name="ModalSlot"
            :close-modal="closeModal"
            :confirm="confirm"
          />
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
  emits: ['close', 'ok'],
  // eslint-disable-next-line no-dupe-keys
  emits: {
    ok: null,
    close: null,
  },
  mounted() {
    document.addEventListener('keydown', this.closeOnKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.closeOnKeydown);
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('ok');
    },
    closeOnKeydown(event) {
      if (this.isOpen === true && event.key === 'Escape') {
        this.closeModal();
      }
    },
  },
};
</script>
