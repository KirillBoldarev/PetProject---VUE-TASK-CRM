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
import localbase from "@/js/localbase";
import { mapMutations } from "vuex";

export default {
  name: "DeleteTaskAction",
  components: { ConfirmDialog },

  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isDialogOpen: false,
    };
  },

  methods: {
    ...mapMutations(["deleteTask"]),

    deleteHandler() {
      this.deleteTask(this.target);
    },

    confirmation() {
      this.isDialogOpen = true;
    },
  },

  computed: {},
};
</script>
