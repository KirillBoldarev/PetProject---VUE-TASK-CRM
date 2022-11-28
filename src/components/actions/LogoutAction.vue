<template>
  <button @click="confirmation" class="button">Выйти из системы</button>
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="logoutHandler"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
export default {
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  data() {
    return {};
  },

  methods: {
    logoutHandler() {
      this.$store.commit("LOGOUT");
      this.$router.push("/");
    },
  },
};
</script>
