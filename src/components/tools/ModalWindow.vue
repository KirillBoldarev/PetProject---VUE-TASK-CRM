<template>
  <teleport to="#modal">
    <transition>
      <div v-if="props.isOpen" class="modal__backdrop" @click="closeModal">
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

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['close', 'ok']);

onMounted(() => {
  document.addEventListener('keydown', () => {
    closeOnKeydown(event);
  });
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', () => {
    closeOnKeydown(event);
  });
});

function closeModal() {
  emit('close');
}
function confirm() {
  emit('ok');
}
function closeOnKeydown(event) {
  if (props.isOpen === true && event.key === 'Escape') {
    closeModal();
  }
}
</script>
