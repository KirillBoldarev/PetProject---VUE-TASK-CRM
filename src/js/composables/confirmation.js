import { ref } from 'vue';

export const isDialogOpen = ref(false);
export function confirmation() {
  isDialogOpen.value = true;
}
