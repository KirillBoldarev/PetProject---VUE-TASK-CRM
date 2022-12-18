import { ref } from 'vue';

export function useConfirmation() {
  const isDialogOpen = ref(false);

  function confirmation() {
    isDialogOpen.value = true;
  }
  return { isDialogOpen, confirmation };
}
