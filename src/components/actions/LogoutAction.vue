<template>
  <button @click="confirmation" class="button--header">Выйти из системы</button>
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="logout"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },

  data() {
    return {
      isDialogOpen: false,
    };
  },

  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    confirmation() {
      this.isDialogOpen = true;
    },
  },
};
</script>
