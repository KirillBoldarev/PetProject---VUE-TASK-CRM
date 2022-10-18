<template>
  <div @click="this.closeModal()" v-if="isOpen === true" class="backdrop">
    <div @click.stop class="modal">
      
        <slot
          name="ModalSlot"
          :closeModal="closeModal"
          :confirm="confirm"
        >
          <button
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            @click="this.closeModal()"
          >
            Отмена
          </button>
          &nbsp;
          <button
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            @click="confirm"
          >
            ОК
          </button>
        </slot>
    </div>
  </div>
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

<style>
.modal {
  top: 75px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
}
.popup h1 {
  text-align: center;
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.footer {
  text-align: right;
  gap: 50px;
}
</style>
