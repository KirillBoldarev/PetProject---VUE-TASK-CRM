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

<script>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin';
import { useTasksStore } from '@/stores/TasksStore';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { mapStores } from 'pinia';

export default {
  name: 'CompleteTaskButton',
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    completeTask() {
      this.tasksStore.COMPLETE_TASK(this.target);
      if (
        this.inspectedTaskStore.GET_INSPECTED_TASK &&
        this.target.id === this.inspectedTaskStore.GET_INSPECTED_TASK.id
      ) {
        this.inspectedTaskStore.COMPLETE_INSPECTED_TASK();
      }
    },
  },

  computed: {
    ...mapStores(useTasksStore, useInspectedTaskStore),
  },
};
</script>
