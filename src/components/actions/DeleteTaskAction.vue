<template>
  <img 
  v-tooltip.bottom="'Удалить'"
  @click="confirmation" class="icon" src="@/icons/trash.png" alt="" />
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="deleteHandler"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import { mapMutations } from "vuex";

export default {
  name: "DeleteTaskAction",
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
    ...mapMutations(["deleteTask", "clearInspectedTask"]),

    deleteHandler() {
      if (this.target.id === this.$store.getters.getInspectedTask.id) {
        this.$router.push("/tasks");
        this.clearInspectedTask();
        this.deleteTask(this.target);
        return;
      }
      this.deleteTask(this.target);
    },
  },

  computed: {},
};
</script>
