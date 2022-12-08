<template>
  <teleport to="#modal">
    <transition>
      <div @click="closeModal" v-if="isOpen" class="modal__backdrop">
        <div @click.stop class="modal__body">
          <div></div>
          <div class="flex-row center">
            <div class="modal__image"></div>
            <div class="modal__close">
              <img
                @click="closeModal"
                class="icon"
                src="@/assets/icons/remove.png"
                alt=""
              />
            </div>
          </div>
          <slot
            class="modal__slot"
            name="ModalSlot"
            :closeModal="closeModal"
            :confirm="confirm"
          >
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
  emits: ["close", "ok"],
  mounted() {
    document.addEventListener("keydown", this.closeOnKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.closeOnKeydown);
  },
  // eslint-disable-next-line no-dupe-keys
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
