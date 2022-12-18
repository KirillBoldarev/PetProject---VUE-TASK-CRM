<template>
  <button class="button mobileOnly" @click="confirmation">
    Выйти из системы
  </button>
  <confirm-dialog
    :is-dialog-open="isDialogOpen"
    @confirm="logoutHandler"
    @close="isDialogOpen = false"
  />
</template>

<script setup>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import { useConfirmation } from '@/js/composables/confirmation';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useRouter } from 'vue-router';

const authenticatedStore = useAuthenticatedStore();
const router = useRouter();
const { isDialogOpen, confirmation } = useConfirmation();

function logoutHandler() {
  console.log('сработал логаутХендлер');
  router.push('/');
  authenticatedStore.LOGOUT();
}
defineExpose({
  confirmation,
});
</script>
