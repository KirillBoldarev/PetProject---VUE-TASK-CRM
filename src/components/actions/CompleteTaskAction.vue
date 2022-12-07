<template>
  <img
    v-if="target.isCompleted === true"
    @click="confirmation"
    v-tooltip.bottom="'Отменить выполнение'"
    class="icon"
    src="@/assets/icons/check.png"
    alt=""
  />

  <img
    v-if="target.isCompleted === false"
    @click="confirmation"
    v-tooltip.bottom="'Выполнить задачу'"
    class="icon"
    src="@/assets/icons/notСheck.png"
    alt=""
  />

  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="completeTask"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue'
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin'
import { useTasksStore } from '@/stores/TasksStore'
import { mapStores } from 'pinia'

export default {
  name: 'CompleteTaskButton',
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  props: {
    target: {
      type: Object,
      required: true
    }
  },

  data () {
    return {}
  },

  methods: {
    completeTask () {
      this.tasksStore.COMPLETE_TASK(this.target)
    }
  },

  computed: {
    ...mapStores(useTasksStore)
  }
}
</script>
