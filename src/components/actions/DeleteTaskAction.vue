<template>
  <img @click="confirmation" class="icon" src="@/icons/trash.png" alt="" />
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="deleteTask"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
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
    deleteTask() {
      this.$store.commit("deleteTask", this.target);
    },
    confirmation() {
      this.isDialogOpen = true;
    },
  },

  computed: {},
};
</script>
