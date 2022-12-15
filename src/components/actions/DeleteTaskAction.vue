<template>
  <img
    v-tooltip.bottom="'Удалить'"
    :class="iconClass"
    src="@/assets/icons/trash.png"
    alt=""
    @click="confirmation"
  />
  <confirm-dialog
    :isDialogOopen="isDialogOpen"
    @confirm="deleteHandler"
    @close="isDialogOpen = false"
  />
</template>

<script setup>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import { confirmation, isDialogOpen } from '@/js/composables/confirmation';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { useTasksStore } from '@/stores/TasksStore';
const tasksStore = useTasksStore();
const inspectedTaskStore = useInspectedTaskStore();

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

function deleteHandler() {
  if (
    inspectedTaskStore.INSPECTED_TASK &&
    props.target.id === inspectedTaskStore.INSPECTED_TASK.id
  ) {
    this.$router.push('/tasks');
    inspectedTaskStore.CLEAR_INSPECTED_TASK();
    tasksStore.DELETE_TASK(props.target);
    return;
  }
  tasksStore.DELETE_TASK(props.target);
}
</script>
