<template>
  <img
    v-tooltip.bottom="'Удалить'"
    @click="confirmation"
    :class="iconClass"
    src="@/icons/trash.png"
    alt=""
  />
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="deleteHandler"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/tools/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import { useInspectedTaskStore } from "@/stores/InspectedTaskStore";
import { useTasksStore } from "@/stores/TasksStore";
import { mapStores } from "pinia";

export default {
  name: "DeleteTaskAction",
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
    },
  },

  data() {
    return {};
  },

  methods: {
    deleteHandler() {
      if (
        this.inspectedTaskStore.GET_INSPECTED_TASK &&
        this.target.id === this.inspectedTaskStore.GET_INSPECTED_TASK.id
      ) {
        this.$router.push("/tasks");
        this.inspectedTaskStore.CLEAR_INSPECTED_TASK();
        this.tasksStore.DELETE_TASK(this.target);
        return;
      }
      this.tasksStore.DELETE_TASK(this.target);
    },
  },

  computed: {
    ...mapStores(useInspectedTaskStore, useTasksStore),
  },
};
</script>
