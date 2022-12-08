<template>
  <img
    v-tooltip.bottom="'Удалить'"
    :class="iconClass"
    src="@/assets/icons/trash.png"
    alt=""
    @click="confirmation"
  />
  <confirm-dialog
    :is-dialog-open="isDialogOpen"
    @confirm="deleteHandler"
    @close="isDialogOpen = false"
  />
</template>

<script>
import { mapStores } from 'pinia';
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { useTasksStore } from '@/stores/TasksStore';

export default {
  name: 'DeleteTaskAction',
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  props: {
    target: {
      type: Object,
      required: true,
    },
    iconClass: {
      type: String,
      required: false,
      default: '',
    },
  },

  data() {
    return {};
  },
  computed: {
    ...mapStores(useInspectedTaskStore, useTasksStore),
  },
  methods: {
    deleteHandler() {
      if (
        this.inspectedTaskStore.GET_INSPECTED_TASK &&
        this.target.id === this.inspectedTaskStore.GET_INSPECTED_TASK.id
      ) {
        this.$router.push('/tasks');
        this.inspectedTaskStore.CLEAR_INSPECTED_TASK();
        this.tasksStore.DELETE_TASK(this.target);
        return;
      }
      this.tasksStore.DELETE_TASK(this.target);
    },
  },
};
</script>
