<template>
  <img
    v-tooltip.bottom="'Удалить'"
    @click="confirmation"
    class="icon"
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
    ...mapMutations(["DELETE_TASK", "CLEAR_INSPECTED_TASK"]),

    deleteHandler() {
      if (this.$store.getters.GET_INSPECTED_TASK && this.target.id === this.$store.getters.GET_INSPECTED_TASK.id) {
        this.$router.push("/tasks");
        this.CLEAR_INSPECTED_TASK();
        this.DELETE_TASK(this.target);
        return;
      }
      this.DELETE_TASK(this.target);
    },
  },

  computed: {},
};
</script>
