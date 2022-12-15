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
import { confirmation, isDialogOpen } from '@/js/composables/confirmation';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

const authenticatedStore = useAuthenticatedStore();

function logoutHandler() {
  authenticatedStore.LOGOUT();
  this.$router.push('/');
}
</script>
