<template>
  <img
    v-if="target.isCompleted === true"
    v-tooltip.bottom="'Отменить выполнение'"
    class="icon"
    src="@/assets/icons/check.png"
    alt=""
    @click="confirmation"
  />

  <img
    v-if="target.isCompleted === false"
    v-tooltip.bottom="'Выполнить задачу'"
    class="icon"
    src="@/assets/icons/notСheck.png"
    alt=""
    @click="confirmation"
  />

  <confirm-dialog
    :is-dialog-open="isDialogOpen"
    @confirm="completeTask"
    @close="isDialogOpen = false"
  />
</template>

<script setup>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import { useConfirmation } from '@/js/composables/confirmation';
import { useTasksStore } from '@/stores/TasksStore';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';

const tasksStore = useTasksStore();
const inspectedTaskStore = useInspectedTaskStore();
const { isDialogOpen, confirmation } = useConfirmation();

const props = defineProps({
  target: {
    type: Object,
    required: true,
  },
});

function completeTask() {
  tasksStore.COMPLETE_TASK(props.target);
  if (
    inspectedTaskStore.INSPECTED_TASK &&
    props.target.id === inspectedTaskStore.INSPECTED_TASK.id
  ) {
    inspectedTaskStore.COMPLETE_INSPECTED_TASK();
  }
}
</script>
