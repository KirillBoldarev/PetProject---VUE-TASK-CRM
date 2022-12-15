<template>
  <img
    v-tooltip.bottom="'Удалить пользователя'"
    :class="iconClass"
    src="@/assets/icons/trash.png"
    alt=""
    @click="confirmation"
  />
  <confirm-dialog
    :is-dialog-open="isDialogOpen"
    @confirm="deleteUserHandler"
    @close="isDialogOpen = false"
  />
</template>

<script setup>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import { confirmation, isDialogOpen } from '@/js/composables/confirmation';
import { useUsersStore } from '@/stores/UsersStore';

const usersStore = useUsersStore();
const props = defineProps({
  target: {
    type: Object,
    required: true,
  },
  iconClass: {
    type: String,
    required: false,
    default: '',
  },
});

function deleteUserHandler() {
  usersStore.DELETE_USER(props.target);
}
</script>
