<template>
  <img @click="confirmation" class="icon" src="@/icons/trash.png" alt="" />
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
  mixins:[confirmationDialogMixin],

  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {

    };
  },

  methods: {
    ...mapMutations(["deleteTask"]),

    deleteHandler() {
      this.deleteTask(this.target);
    },
  },

  computed: {},
};
</script>
