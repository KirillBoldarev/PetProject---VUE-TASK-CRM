<template>
  <img @click="confirmation" class="icon" src="@/icons/trash.png" alt="" />
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="deleteUser"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";

import localbase from "@/js/localbase";

export default {
  name: "DeleteUserButton",
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
    deleteUser() {
      this.$store.commit("deleteUser", this.target);
      localbase.collection("users").doc({ id: this.target.id }).delete();

    },
    confirmation() {
      this.isDialogOpen = true;
    },
  },

  computed: {},
};
</script>
